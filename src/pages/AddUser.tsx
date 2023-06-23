import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AppContext } from 'AppContext';
import { ContextType, Option } from 'types';
import Title from 'components/Title';
import { Input } from 'components/Input';
import { Button } from 'components/Button';
import 'styles/external-components.css';
import Select from 'react-select';
import { RiAsterisk } from 'react-icons/ri';
import { InputErrorAlert } from 'components/InputErrorAlert';

const roleArr: Option[] = [
  {
    value: 'PGP',
    label: 'PGP'
  },
  {
    value: 'Admin',
    label: 'Admin'
  }
];

const locationArr: Option[] = [
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
  const { groups, setUpdate } = useContext(AppContext) as ContextType;
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [userLocation, setUserLocation] = useState('Amsterdam');
  const [role, setRole] = useState('pgp');
  const cookieToken: string | undefined = Cookies.get('token');
  const navigate = useNavigate();
  const selectOptions = groups.map((item) => ({
    label: item.name,
    value: item.id
  }));
  const [selectedGroups, setSelectedGroups] = useState<any>({});

  const [isValid, setIsValid] = useState({
    email: false,
    location: false,
    bootcamp: false,
    role: false
  });

  const [toShowValidationError, setToShowValidationError] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  
  const isValidEmail = (email: string): boolean => {
    // const regex = /^[a-zA-Z0-9._%+-]+@appliedtechnology\.se$/;
    // return regex.test(email);
    return true;
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

  useEffect(() => {
    setIsValid({
      ...isValid,
      email: email ? true : false,
      location: userLocation ? true : false,
      bootcamp: selectedGroups.label ? true : false,
      role: role ? true : false
    });
    // eslint-disable-next-line
  }, [email, userLocation, selectedGroups, role]);

  const handleChangeBootcamp = (selectedOption: any) => {
    setSelectedGroups(selectedOption);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      fullName: fullName,
      role: role.toLowerCase(),
      location: userLocation,
      status: 'active',
      groupsId: [selectedGroups.value],
      bootcamp: selectedGroups.label
    };
    if (
      isValid.email === true &&
      isValid.location === true &&
      isValid.bootcamp === true &&
      isValid.role === true
    ) {
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
            if (response.statusText === 'OK') {
              const target = e.target as HTMLFormElement;
              target.reset();
              setEmail('');
              setUserLocation('Amsterdam');
              setRole('PGP');
              setSelectedGroups({
                label: '',
                value: ''
              });
              setToShowValidationError(false);
              setUpdate(true);
            }
          })
          .catch((error) => {
            if (error.response.status === 409) {
              setIsValid({ ...isValid, email: false });
              setErrorMessageEmail('This user already exists');
              setToShowValidationError(true);
              setTimeout(() => {
                setToShowValidationError(false);
              }, 2000);
              console.clear();
            } else {
              console.clear();
              navigate('/error');
            }
          });
      } else {
        setIsValid({ ...isValid, email: false });
        setErrorMessageEmail('Enter appliedtechnology email address');
        setToShowValidationError(true);
      }
    } else {
      setToShowValidationError(true);
    }
  };

  const handleChangeLocation = (selectedOption: any) => {
    setUserLocation(selectedOption.label);
  };

  const handleChangeRole = (selectedOption: any) => {
    setRole(selectedOption.label);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Title underline title="Add New User" />
      <Input
        label="E-mail address"
        required={true}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputErrorAlert
        isValid={isValid.email}
        toShowValidationError={toShowValidationError}
        errorMessage={errorMessageEmail}
      />
      <div>
        <label className="text-pink-600 text-lg font-bold font-sans flex items-center">
          Location <span>&nbsp;</span>{' '}
          <RiAsterisk className="text-[10px] text-red-500" />
        </label>
        <Select
          className="mb-4 "
          classNamePrefix="single_select"
          onChange={handleChangeLocation}
          options={locationArr}
          defaultValue={locationArr[0]}
        />
      </div>
      <label className="text-pink-600 text-lg font-bold font-sans flex items-center">
        Bootcamp <span>&nbsp;</span>{' '}
        <RiAsterisk className="text-[10px] text-red-500" />
      </label>
      <div className=".dropdown-container">
        <Select
          className="mb-4 "
          classNamePrefix="single_select"
          onChange={handleChangeBootcamp}
          options={selectOptions}
          value={selectedGroups}
        />
      </div>
      <InputErrorAlert
        isValid={isValid.bootcamp}
        toShowValidationError={toShowValidationError}
      />
      <div>
        <label className="text-pink-600 text-lg font-bold font-sans flex items-center">
          Role <span>&nbsp;</span>{' '}
          <RiAsterisk className="text-[10px] text-red-500" />
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
      <InputErrorAlert
        isValid={isValid.email}
        toShowValidationError={toShowValidationError}
        errorMessage="This user already exists"
      />
    </form>
  );
};

export default AddUser;
