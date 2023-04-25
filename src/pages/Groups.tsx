import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../AppContext';
import { ContextType } from '../types';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import Title from '../components/Title';
import { ListItem } from '../components/ListItem';
import { Button } from '../components/Button';

const Groups = () => {
  const { user, groups, setUpdate } = useContext(AppContext) as ContextType;
  const navigate = useNavigate();

  let location = useLocation().pathname.toLowerCase();

  const handleDeleteGroup = (e: any, groupId: number) => {
    e.preventDefault();
    axios
      .delete(
        `https://project-salty-backend.azurewebsites.net/Groups/${groupId}`
      )
      .then(() => setUpdate(true));
  };

  return (
    <div className="container-xl">
      <Header role={user.role} location={location} />
      <div className="flex justify-center">
        <div className="max-w-6xl w-full mx-2">
          <div className="flex justify-end">
            {user.role === 'admin' && (
              <div className="w-48 hidden md:flex">
                <Button
                  buttonColor="white"
                  label="Add New Group"
                  onClick={() => {
                    navigate('/groups/add-group');
                  }}
                />
              </div>
            )}
          </div>
          <Title underline title="Groups" />
          <ul className="flex flex-row flex-wrap justify-between capitalize">
            {groups.map((group) => {
              return (
                <ListItem
                  key={group?.id}
                  id={group?.id}
                  title={group?.name}
                  route="/groups"
                  iconDelete={user.role === 'user' ? false : true}
                  onClickDeleteIcon={(e: any) => handleDeleteGroup(e, group.id)}
                />
              );
            })}
          </ul>
          <Footer role={user.role} image={user.imageURL} />
        </div>
      </div>
    </div>
  );
};

export default Groups;
