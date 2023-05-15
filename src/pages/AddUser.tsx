import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { MultiSelect } from 'react-multi-select-component';
import { AppContext } from '../AppContext';
import { ContextType } from '../types';
import { IRole, ILocation } from '../types';
import Title from '../components/Title';
import { Input } from '../components/Input';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import '../styles/external-components.css';

const roleArr: IRole[] = [
  {
    name: 'PGP'
  },
  {
    name: 'Admin'
  }
];

const locationArr: ILocation[] = [
  {
    name: 'Amsterdam'
  },
  {
    name: 'Oslo'
  },
  {
    name: 'Stockholm'
  }
];

const AddUser = () => {
  const { user, groups, setUpdate } = useContext(AppContext) as ContextType;
  const [email, setEmail] = useState('');
  const[fullName, setFullName] = useState('');
  const [userLocation, setUserLocation] = useState('Amsterdam');
  const [role, setRole] = useState('pgp');
  const cookieToken: string | undefined = Cookies.get('token');

  let urlLocation = useLocation().pathname.toLowerCase();
  const selectOptions = groups.map((item) => ({
    label: item.name,
    value: item.id
  }));
  const [selectedGroups, setSelectedGroups] = useState(selectOptions);
  const selectedGroupsIds = selectedGroups.map((group) => group.value);

  const getUserName = () => {
    if( email !== "") {
    try{
      const string = email.split('@')[0];
      const name = string.split(".");
      const firstName = name[0].charAt(0).toUpperCase() + name[0].slice(1);
      const lastName = name[1].charAt(0).toUpperCase() + name[1].slice(1);
      const fullName = `${firstName} ${lastName}`;
      setFullName(fullName);
    return
    } catch(err){
      return
    }
     } 
     return
  }
  
  useEffect(()=> {
    getUserName()
  },[email])

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  
    const newUser = {
      email: email,
      fullName: fullName,
      role: role.toLowerCase(),
      location: userLocation,
      status: 'active',
      groupsId: selectedGroupsIds
    };
    axios
      .post(
        `https://project-salty-backend.azurewebsites.net/Users`,
        {
          ...newUser
        },
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
            Accept: 'text/plain'
          }
        }
      )
      .then((response) => {
        console.log(response.statusText);
      });
    const target = e.target as HTMLFormElement;
    target.reset();
    setEmail('');
    setUserLocation('Amsterdam');
    setRole('PGP');
    setUpdate(true)
  };

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
            <label className="text-pink-600 text-lg font-bold font-sans">
              Group
            </label>
            <div className=".dropdown-container">
              <MultiSelect
                className="mb-4"
                options={selectOptions}
                value={selectedGroups}
                onChange={setSelectedGroups}
                labelledBy="Select"
              />
            </div>
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
