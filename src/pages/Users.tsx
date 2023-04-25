import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { ContextType } from '../types';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import Title from '../components/Title';
import { ListItem } from '../components/ListItem';
import { Button } from '../components/Button';

const Users = () => {
  const { user, users } = useContext(AppContext) as ContextType;
  const navigate = useNavigate();
  let location = useLocation().pathname.toLowerCase();

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
                  label="Add User"
                  onClick={() => {
                    navigate('/add-user');
                  }}
                />
              </div>
            )}
          </div>
          <Input icon placeholder="Search" />
          <Title underline title="Users" />
          <ul className="flex flex-row flex-wrap justify-between capitalize">
            {users.map((person) => {
              return (
                <ListItem
                  key={person?.id}
                  id={person?.id}
                  title={person?.fullName}
                  route="/users"
                  iconEdit={user.role === 'user' ? false : true}
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

export default Users;
