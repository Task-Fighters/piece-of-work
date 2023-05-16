import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AppContext } from '../AppContext';
import { ContextType } from '../types';
import { IRole, ILocation, IOption } from '../types';
import Title from '../components/Title';
import { Input } from '../components/Input';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import '../styles/external-components.css';
import Select from 'react-select';


const roleArr: IOption[] = [
  {
    value: 'PGP',
    label: 'PGP'
  },
  {
    value: 'Admin',
    label: 'Admin'
  }
];

const locationArr: IOption[] = [
  {
    value: 'Amsterdam',
    label: 'Amsterdam'
  },
  {
    value: 'Oslo',
    label: 'Oslo'
  },
  {
    value: 'Stockholm',
    label: 'Stockholm'
  }
];


const AddUser = () => {
  const { user, groups, setUpdate } = useContext(AppContext) as ContextType;
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [userLocation, setUserLocation] = useState('Amsterdam');
  const [role, setRole] = useState('pgp');
  const cookieToken: string | undefined = Cookies.get('token');

  let urlLocation = useLocation().pathname.toLowerCase();
  const selectOptions = groups.map((item) => ({
    label: item.name,
    value: item.id
  }));
  const [selectedGroups, setSelectedGroups] = useState<any>({});

  const isValidEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@appliedtechnology\.se$/;
    console.log(regex.test(email))
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

  const handleChangeBootcamp = (selectedOption: any) => {
    setSelectedGroups(selectedOption);

  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(selectedGroups)

    const newUser = {
      email: email,
      fullName: fullName,
      role: role.toLowerCase(),
      location: userLocation,
      status: 'active',
      groupsId: [selectedGroups.value],
      bootcamp: selectedGroups.label
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
  const handleChangeLocation = (selectedOption: any) => {
    setUserLocation(selectedOption.label);
  };

  const handleChangeRole = (selectedOption: any) => {
    setRole(selectedOption.label);
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

            <div>
              <label className="text-pink-600 text-lg font-bold font-sans">
                Location
              </label>
              <Select
                className="mb-4 "
                classNamePrefix="single_select"
                onChange={handleChangeLocation}
                options={locationArr}
                defaultValue={locationArr[0]}
              />
            </div>
            <label className="text-pink-600 text-lg font-bold font-sans">
              Bootcamp
            </label>
            <div className=".dropdown-container">
              <Select
                className="mb-4 "
                classNamePrefix="single_select"
                onChange={handleChangeBootcamp}
                options={selectOptions}
              />
              
            </div>
            <div>
              <label className="text-pink-600 text-lg font-bold font-sans">
                Role
              </label>
              <Select
                className="mb-4 "
                classNamePrefix="single_select"
                onChange={handleChangeRole}
                options={roleArr}
                defaultValue={roleArr[0]}
              />
            </div>
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
