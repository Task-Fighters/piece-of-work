import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { ContextType } from '../types';
import { IRole, ILocation } from '../types';
import Title from '../components/Title';
import { Input } from '../components/Input';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

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

const UpdateUser = () => {
  const { user, groups } = useContext(AppContext) as ContextType;

  let location = useLocation().pathname.toLowerCase();

  return (
    <div className="container-xl">
      <Header role={user.role} location={location} />
      <div className="flex justify-center">
        <div className="max-w-6xl mx-2 w-full">
          <form>
            <Title underline title="Update User" />
            <div className="bg-gray-100 mb-4">
              <Card
                description=""
                subtitle={user.email}
                title={user.fullName}
              />
            </div>
            <Input options={locationArr} select label="Location" />
            <Input options={groups} select multiple label="Group" />
            <Input options={roleArr} select label="Role" />
            <div>
              <Button label="Add User" />
            </div>
            <div className="mb-32">
              <Button buttonColor="pink" label="Delete User" />
            </div>
          </form>
        </div>
        <Footer role={user.role} image={user.imageUrl} />
      </div>
    </div>
  );
};

export default UpdateUser;
