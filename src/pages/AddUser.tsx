import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AppContext } from '../AppContext';
import { ContextType } from '../types';
import { IRole, ILocation } from '../types';
import Title from '../components/Title';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import '../styles/external-components.css';
import Select from 'react-select';

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
  const { groups, setUpdate } = useContext(AppContext) as ContextType;
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [userLocation, setUserLocation] = useState('Amsterdam');
  const [role, setRole] = useState('pgp');
  const cookieToken: string | undefined = Cookies.get('token');

  const selectOptions = groups.map((item) => ({
    label: item.name,
    value: item.id
  }));
  const [selectedGroups, setSelectedGroups] = useState<any>({});

  const isValidEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@appliedtechnology\.se$/;
    return regex.test(email);
  };

  useEffect(() => {
    const getUserName = () => {
      if (email !== '') {
        try {
          const string = email.split('@')[0];
          const name = string.split('.');
          const firstName = name[0].charAt(0).toUpperCase() + name[0].slice(1);
          const lastName = name[1].charAt(0).toUpperCase() + name[1].slice(1);
          const fullName = `${firstName} ${lastName}`;
          setFullName(fullName);
          return;
        } catch (err) {
          return;
        }
      }
      return;
    };
    getUserName();
  }, [email]);

  const handleChangeBootcamo = (selectedOption: any) => {
    setSelectedGroups(selectedOption);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const selectedGroupsIds = selectedGroups.map(
      (group: { value: any }) => group.value
    );

    const newUser = {
      email: email,
      fullName: fullName,
      role: role.toLowerCase(),
      location: userLocation,
      status: 'active',
      groupsId: selectedGroupsIds
    };

    console.log(newUser);
    if (isValidEmail(email)) {
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
    } else {
      //change this later into styled alert
      alert('Enter appliedtechnology email address');
    }
    const target = e.target as HTMLFormElement;
    target.reset();
    setEmail('');
    setUserLocation('Amsterdam');
    setRole('PGP');
    setUpdate(true);
  };

  return (
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
        Bootcamp
      </label>
      <div className=".dropdown-container">
        <Select
          className="mb-4 "
          classNamePrefix="single_select"
          onChange={handleChangeBootcamo}
          options={selectOptions}
          value={selectedGroups}
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
  );
};

export default AddUser;
