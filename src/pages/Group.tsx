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
import Title from '../components/Title';

const Group = () => {
  const { user, users, setUpdate } = useContext(AppContext) as ContextType;
  const [group, setGroup] = useState<IGroup>({} as IGroup);
  const [groupName, setGroupName] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [idUserToAdd, setIdUserToAdd] = useState<number>();
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
  }, [cookieToken, groupId, group]);

  useEffect(() => {
    if (emailUser.length > 0) {
      const userToAdd = users.filter((user) => user.email.includes(emailUser));
      if (userToAdd.length === 1) {
        setIdUserToAdd(userToAdd[0].id);
        // console.log(userToAdd);
        // const queryParam = `${groupId}?userId=${idUserToAdd}`;
        // console.log(queryParam);
      }
    }
  }, [users, emailUser]);

  const handleAddUserToGroup = () => {
    try {
      if (idUserToAdd) {
        axios
          .post(
            `https://project-salty-backend.azurewebsites.net/Groups/AddUser/${groupId}?userId=${idUserToAdd}`,
            { userId: idUserToAdd, id: groupId },
            {
              headers: {
                Authorization: `Bearer ${cookieToken}`,
                Accept: 'text/plain'
              }
            }
          )
          .then((res) => {
            setEmailUser('');
          });
      }
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
        setGroup(res.data);
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
            value={emailUser}
            onChange={(e) => setEmailUser(e.target.value)}
          />
          <div className="mb-4">
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
          <Footer role={user.role} image={user.imageUrl} />
        </div>
      </div>
    </div>
  );
};

export default Group;
