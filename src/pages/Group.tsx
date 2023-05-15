import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { ContextType, IGroup } from '../types';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { ListItem } from '../components/ListItem';
import { Button } from '../components/Button';
import Editable from '../components/Editable';

const Group = () => {
  const { user, setUpdate, users } = useContext(AppContext) as ContextType;
  const [group, setGroup] = useState<IGroup>({} as IGroup);
  const [groupName, setGroupName] = useState('');
  const [emailUser, setEmailUser] = useState('');
  // const [idUserToAdd, setIdUserToAdd] = useState<number>();
  let { groupId } = useParams();
  let location = useLocation().pathname.toLowerCase();
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
  // iliana.scalco@appliedtechnology.se
  let idUserToAdd: number;
  if (emailUser.length > 0) {
    const userToAdd = users.filter(user => user.email.includes(emailUser));
    if (userToAdd.length === 1) {
      idUserToAdd = userToAdd[0].id;
      console.log(userToAdd);
      const queryParam = `${groupId}?userId=${idUserToAdd}`;
      console.log(queryParam);
    }
  }
  

  const handleAddUserToGroup = () => {
    try {
      if (idUserToAdd) {
        const queryParam = `${groupId}?userId=${idUserToAdd}`;
        console.log(queryParam);
        axios
          .post(`https://project-salty-backend.azurewebsites.net/Groups/AddUser/${queryParam}`, 
          {userId: idUserToAdd, id: groupId},
          {
            headers: {
              Authorization: `Bearer ${cookieToken}`,
              Accept: 'text/plain'
            }
          })
          .then(res => console.log(res));
      }
    } catch (error) {
      console.error();
    }
  }
  // const handleDeleteUserFromGroup = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   axios
  //     .put(
  //       `https://project-salty-backend.azurewebsites.net/Groups/${groupId}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${cookieToken}`,
  //         Accept: 'text/plain'
  //       }
  //     }
  //     )
  //     .then((response) => {
  //       console.log(response.statusText);
  //     });
  // };
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
    <div className="container-xl">
      <Header role={user.role} location={location} />
      <div className="flex justify-center">
        <div className="max-w-6xl w-full mx-2">
          <Editable text={groupName} groupId={Number(groupId)} type="input">
            <input
              type="text"
              name="task"
              value={groupName}
              className="focus:outline-none w-96"
              onChange={(e) => setGroupName(e.target.value)}
            />
          </Editable>

          <Input 
          label="User E-mail Address" 
          onChange={e => setEmailUser(e.target.value)}
          />
          <div className="mb-4">
            <Button 
            label="Add User to Group" 
            type="button" 
            onClick={handleAddUserToGroup}
            />
            <Button
              label="Delete Group"
              type="button"
              className="bg-pink-600 border-pink-600 text-white border-"
              onClick={(e) => {
                handleDeleteGroup(e, Number(groupId));
              }}
            />
          </div>
          <ul className="flex flex-row flex-wrap justify-between capitalize">
            {group.users?.map((person) => {
              return (
                <ListItem
                  key={person?.id}
                  id={person?.id}
                  title={person?.fullName}
                  route="/users"
                  iconDelete={user.role === 'admin' ? true : false}
                />
              );
            })}
          </ul>
          <Footer role={user.role} image={user.imageUrl} />
        </div>
      </div>
    </div>
  );
};

export default Group;
