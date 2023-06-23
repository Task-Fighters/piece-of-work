import { useContext } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from 'AppContext';
import { ContextType } from 'types';
import Title from 'components/Title';
import { ListItem } from 'components/ListItem';
import { Button } from 'components/Button';

const Groups = () => {
  const { user, groups, setUpdate } = useContext(AppContext) as ContextType;
  const navigate = useNavigate();
  const cookieToken: string | undefined = Cookies.get('token');

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
      .then(() => setUpdate(true))
      .catch((error) => { 
        navigate("/error")
      });
  };

  return (
    <>
      <div className="flex justify-end">
        {user.role === 'admin' && (
          <div className="md:w-48 md:flex xs:w-full">
            <Button
              buttonColor="white"
              label="Add New Group"
              type="button"
              onClick={() => {
                navigate('/groups/new');
              }}
            />
          </div>
        )}
      </div>
      <Title underline title="Groups" />
      <ul className="flex flex-row flex-wrap justify-between capitalize mb-32">
        {groups.map((group) => {
          return (
            <ListItem
              key={group?.id}
              id={group?.id}
              title={group?.name}
              route="/groups"
              onClickDeleteIcon={(e: any) => handleDeleteGroup(e, group.id)}
            />
          );
        })}
      </ul>
    </>
  );
};

export default Groups;
