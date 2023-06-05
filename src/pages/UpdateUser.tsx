import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IUser, ContextType, IOption } from '../types';
import { AppContext } from '../AppContext';
import Title from '../components/Title';
import { Button } from '../components/Button';
import Select from 'react-select';
import { Input } from '../components/Input';

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

const UpdateUser = () => {
  const { users, groups, setUsers } = useContext(AppContext) as ContextType;
  const [singleUser, setSingleUser] = useState<IUser>({} as IUser);
  const [singleUserLocation, setSingleUserLocation] = useState<any>({});
  const [singleUserRole, setSingleUserRole] = useState<any>({});
  let { userId } = useParams();
  const navigate = useNavigate();
  const cookieToken: string | undefined = Cookies.get('token');

  useEffect(() => {
    axios
      .get(`https://project-salty-backend.azurewebsites.net/Users/${userId}`, {
        headers: {
          Authorization: `Bearer ${cookieToken}`,
          Accept: 'text/plain'
        }
      })
      .then((response) => {
        setSingleUser(response.data);
        setSingleUserLocation(
          locationArr.find(
            (location) =>
              location.label.toLowerCase() ===
              response.data.location.toLowerCase()
          )
        );
        setSingleUserRole(
          roleArr.find(
            (item) =>
              item.label.toLowerCase() === response.data.role.toLowerCase()
          )
        );
      }).catch((error) => { 
        navigate("/error")
      });
      // eslint-disable-next-line
  }, [userId, cookieToken, groups]);

  const handleUpdateUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updatedUser = {
      email: singleUser.email,
      fullName: singleUser.fullName,
      imageUrl: singleUser.imageUrl,
      role: singleUserRole.value.toLowerCase(),
      location: singleUserLocation.value,
      status: singleUser.status,
      bootcamp:  singleUser.bootcamp,
      groupsId: singleUser.groupsId
    };

    axios
      .put(
        `https://project-salty-backend.azurewebsites.net/Users/update/${userId}`,
        { ...updatedUser },
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
            Accept: 'text/plain'
          }
        }
      )
      .then((response) => {
        console.log(response.statusText);
        navigate(`/users/${userId}`);
      }).catch((error) => { 
        navigate("/error")
      });
  };

  const handleDeleteUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .delete(
        `https://project-salty-backend.azurewebsites.net/Users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
            Accept: 'text/plain'
          }
        }
      )
      .then((response) => {
        console.log(response.statusText);
        setUsers(users.filter((user) => user.id !== Number(userId)));
        navigate(`/users`);
      }).catch((error) => { 
        navigate("/error")
      });
  };

  const handleChangeSelectedLocation = (selectedOption: any) => {
    setSingleUserLocation(selectedOption);
  };

  const handleChangeSelectedRole = (selectedOption: any) => {
    setSingleUserRole(selectedOption);
  };

  return (
    <>
      <form>
            <Title underline title="Update User" />
            <div className="bg-gray-100 mb-4 px-4 pb-2 pt-1">
              <Title
                className="!mb-0 !text-lg font-bold !font-poppins"
                title={singleUser.fullName}
              />
              <p className="text-sm font-bold font-roboto">
                {singleUser.email}
              </p>
            </div>
            <div>
              <label className="text-pink-600 text-lg font-bold font-sans">
                Location
              </label>
              <Select
                className="mb-4 "
                classNamePrefix="single_select"
                onChange={handleChangeSelectedLocation}
                options={locationArr}
                value={singleUserLocation}
              />
            </div>
            <Input label="Bootcamp" disabled={true} placeholder={singleUser?.bootcamp} />
            <div>
              <label className="text-pink-600 text-lg font-bold font-sans">
                Role
              </label>
              <Select
                className="mb-4 "
                classNamePrefix="single_select"
                onChange={handleChangeSelectedRole}
                options={roleArr}
                value={singleUserRole}
              />
            </div>
            <div>
              <Button
                label="Update User"
                type="button"
                onClick={(e) => {
                  handleUpdateUser(e);
                }}
              />
            </div>
            <div className="mb-32">
              <Button
                buttonColor="pink"
                label="Delete User"
                type="button"
                onClick={(e) => {
                  handleDeleteUser(e);
                }}
              />
            </div>
          </form>
    </>
  );
};

export default UpdateUser;
