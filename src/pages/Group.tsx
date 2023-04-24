import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ContextType } from '../types';
import { AppContext } from '../AppContext';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import Title from '../components/Title';
import { ListItem } from '../components/ListItem';
import { Button } from '../components/Button';
import { MdEdit } from 'react-icons/md';

const Group = () => {
  const { user, users } = useContext(AppContext) as ContextType;

  let location = useLocation().pathname.toLowerCase();

  return (
    <div className="container-xl">
      <Header role={user.role} location={location} />
      <div className="flex justify-center">
        <div className="max-w-6xl w-full mx-2">
          <div className="w-full flex flex-row justify-between items-center border-b-2 border-pink-600 mb-4">
            <Title title="JSFS Amsterdam Fall 2022" className="!mb-0" />
            <MdEdit className="text-2xl text-pink-600" />
          </div>

          <Input label="User E-mail Address" />
          <div className="mb-4">
            <Button label="Add User to Group" />
          </div>
          <ul className="flex flex-row flex-wrap justify-between capitalize">
            {users.map((person) => {
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
          <Footer role={user.role} image={user.imageURL} />
        </div>
      </div>
    </div>
  );
};

export default Group;
