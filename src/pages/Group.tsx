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
import { Card } from '../components/Card';
import { RiAsterisk } from 'react-icons/ri';

const Group = () => {
  const { user, users, setUpdate, assignments } = useContext(
    AppContext
  ) as ContextType;
  const [group, setGroup] = useState<IGroup>({} as IGroup);
  const [groupName, setGroupName] = useState('');

  const selectOptions = users?.map((item) => ({
    label: item.email,
    value: item.id,
    disabled: false
  }));

  selectOptions.map((item) => {
    if (group.users?.some((user) => user.id === item.value)) {
      item.disabled = true;
      return item;
    }
    return item;
  });
  const [selected, setSelected] = useState([]);
  const selectedUsersIds = selected.map((user: { value: any }) => user.value);

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
      }).catch((error) => { 
        navigate("/error")
      });
  }, [cookieToken, groupId]);

  const handleAddUserToGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
          console.log(res.statusText);
        }).catch((error) => { 
          navigate("/error")
        });
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
      }).catch((error) => { 
        navigate("/error")
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
      }).catch((error) => { 
        navigate("/error")
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
      <label className="text-pink-600 text-lg font-bold font-sans flex items-center">
        User E-mail Address <span>&nbsp;</span> <RiAsterisk className='text-xxs text-red-500'/>
      </label>
      <div className=".dropdown-container">
        <MultiSelect
          options={selectOptions}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
        />
      </div>
      <div className="mt-4">
        <Button
          label="Add User to Group"
          type="button"
          onClick={handleAddUserToGroup}
        />
      </div>
      {group.users?.length > 0 && (
        <Title title={`Group Users (${group.users.length})`} />
      )}
      <ul className="flex flex-row flex-wrap justify-between capitalize mb-4">
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
      <Title title="Group Assignments" />
      <div className="flex flex-row flex-wrap justify-between mb-6">
        {assignments
          .filter((assignment) => assignment.groupId === group.id)
          .map((assignment, index) => (
            <Card
              cardType="card"
              id={assignment.id}
              key={index}
              description={assignment.description}
              subtitle={assignment.startDate}
              title={assignment.title}
            />
          ))}
      </div>
      <Button
        label="Delete Group"
        type="button"
        className="bg-pink-600 border-pink-600 text-white mb-36"
        onClick={(e) => {
          handleDeleteGroup(e, Number(groupId));
        }}
      />
    </>
  );
};

export default Group;
