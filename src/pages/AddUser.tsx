import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { ContextType } from '../types';
import { IRole, ILocation } from '../types';
import Title from '../components/Title';
import { Input } from '../components/Input';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';

const roleArr: IRole[] = [
  {
    id: 1,
    name: 'PGP'
  },
  {
    id: 2,
    name: 'Admin'
  }
];

const locationArr: ILocation[] = [
  {
    id: 1,
    name: 'Amsterdam'
  },
  {
    id: 2,
    name: 'Oslo'
  },
  {
    id: 3,
    name: 'Stockholm'
  }
];

const AddUser = () => {
  const { user, groups } = useContext(AppContext) as ContextType;

  let location = useLocation().pathname.toLowerCase();

  return (
    <div className="container-xl">
      <Header role={user.role} location={location} />
      <div className="flex justify-center">
        <div className="max-w-6xl mx-2 w-full">
          <form>
            <Title underline title="Add New User" />
            <Input label="E-mail address" />
            <Input options={locationArr} select label="Location" />
            <Input options={groups} select multiple label="Group" />
            <Input options={roleArr} select label="Role" />
            <div className="mb-32">
              <Button label="Add User" />
            </div>
          </form>
        </div>
        <Footer role={user.role} image={user.imageUrl} />
      </div>
    </div>
  );
};

export default AddUser;
