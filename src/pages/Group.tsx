import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { ContextType, IGroup } from '../types';
import { ListItem } from '../components/ListItem';
import { Button } from '../components/Button';
import Editable from '../components/Editable';
import Title from '../components/Title';
import { MultiSelect } from 'react-multi-select-component';


const Group = () => {
  const { user, users, setUpdate } = useContext(AppContext) as ContextType;
  const [group, setGroup] = useState<IGroup>({} as IGroup);
  const [groupName, setGroupName] = useState('');
  
  const selectOptions = users?.map(item => (
      {
        label: item.email,
        value: item.id,
        disabled: false
      }
  ));

  selectOptions.map(item => {
    if (group.users?.some((user) => user.id === item.value) ) {
     item.disabled = true ;
     return item;
    }
    return item;
  })
  const [selected, setSelected] = useState([]);
  const selectedUsersIds = selected.map((user: { value: any; }) => user.value);

  let { groupId } = useParams();
  const cookieToken: string | undefined = Cookies.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://project-salty-backend.azurewebsites.net/Groups/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
            Accept: 'text/plain'
          }
        }
      )
      .then((response) => {
        setGroup(response.data);
        setGroupName(response.data.name);
      });
  }, [cookieToken, groupId]);

 

  const handleAddUserToGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
        axios
          .post(
            `https://project-salty-backend.azurewebsites.net/Groups/AddUser/${groupId}`,
            { users: [...selectedUsersIds], id: groupId },
            {
              headers: {
                Authorization: `Bearer ${cookieToken}`,
                Accept: 'text/plain'
              }
            }
          )
          .then((res) => {
         console.log(res.statusText)
          });
    } catch (error) {
      console.error();
    }
  };

  const handleRemoveUser = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    axios
      .delete(
        `https://project-salty-backend.azurewebsites.net/Groups/RemoveUser/${groupId}?userId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
            Accept: 'text/plain'
          }
        }
      )
      .then((res) => {
        console.log(res.data);

        // setGroup(res.data);
      });
  };

  const handleDeleteGroup = (e: any, groupId: number) => {
    e.preventDefault();
    axios
      .delete(
        `https://project-salty-backend.azurewebsites.net/Groups/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
            Accept: 'text/plain'
          }
        }
      )
      .then(() => {
        setUpdate(true);
        navigate('/groups');
      });
  };
  return (
    <>
      <Editable text={groupName} groupId={Number(groupId)} type="input">
        <input
          type="text"
          name="task"
          value={groupName}
          className="focus:outline-none w-96"
          onChange={(e) => setGroupName(e.target.value)}
        />
      </Editable>
      <label className="text-pink-600 text-lg font-bold font-sans">
        User E-mail Address            
      </label>
      <div className=".dropdown-container">
      <MultiSelect
        options={selectOptions}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
      </div>
      <div className="mb-4 mt-4">
        <Button
          label="Add User to Group"
          type="button"
          onClick={handleAddUserToGroup}
        />
      </div>
      <Title title="Group Users" />
      <ul className="flex flex-row flex-wrap justify-between capitalize">
        {group.users?.map((person) => {
          const fullName = users.find(
            (user) => person.id === user.id
          )?.fullName;
          return (
            <ListItem
              key={person?.id}
              id={person?.id}
              title={fullName || ''}
              route="/users"
              iconDelete={user.role === 'admin' ? true : false}
              onClickDeleteIcon={(e: any) => handleRemoveUser(e, person.id)}
            />
          );
        })}
      </ul>
      <Button
        label="Delete Group"
        type="button"
        className="bg-pink-600 border-pink-600 text-white border-"
        onClick={(e) => {
          handleDeleteGroup(e, Number(groupId));
        }}
      />
    </>
  );
};

export default Group;
