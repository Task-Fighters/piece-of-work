import axios from 'axios';
import { useContext, useState } from 'react';
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
    // id: 1,
    name: 'PGP'
  },
  {
    // id: 2,
    name: 'Admin'
  }
];

const locationArr: ILocation[] = [
  {
    // id: 1,
    name: 'Amsterdam'
  },
  {
    // id: 2,
    name: 'Oslo'
  },
  {
    // id: 3,
    name: 'Stockholm'
  }
];

const AddUser = () => {
  const { user, groups } = useContext(AppContext) as ContextType;
  const [email, setEmail] = useState('');
  const [userLocation, setUserLocation] = useState('Amsterdam');
  const [userGroups, setUserGroups] = useState<string[]>([]);
  const [role, setRole] = useState('pgp');

  let urlLocation = useLocation().pathname.toLowerCase();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      fullName: '',
      role: role,
      location: userLocation,
      status: 'active',
      groups: userGroups
    };
    console.log(newUser);
    axios
      .post(`https://project-salty-backend.azurewebsites.net/Users`, {
        ...newUser
      })
      .then((response) => {
        console.log(response.statusText);
      });
    const target = e.target as HTMLFormElement;
    target.reset();
    setEmail('');
    setUserLocation('Amsterdam');
    setRole('PGP');
    setUserGroups([]);
  };
  console.log(userGroups);
  return (
    <div className="container-xl">
      <Header role={user.role} location={urlLocation} />
      <div className="flex justify-center">
        <div className="max-w-6xl mx-2 w-full">
          <form onSubmit={handleSubmit}>
            <Title underline title="Add New User" />
            <Input
              label="E-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              options={locationArr}
              select
              label="Location"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
            />
            <Input
              options={groups}
              select
              multiple
              label="Group"
              value={userGroups}
              onChange={(e) => setUserGroups([...userGroups, e.target.value])}
            />
            <Input
              options={roleArr}
              select
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <div className="mb-32">
              <Button label="Add User" type="submit" />
            </div>
          </form>
        </div>
        <Footer role={user.role} image={user.imageUrl} />
      </div>
    </div>
  );
};

export default AddUser;
