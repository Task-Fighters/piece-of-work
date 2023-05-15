import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext, useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { IUser, ContextType, IOption } from '../types';
import { AppContext } from '../AppContext';
import Title from '../components/Title';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { MultiSelect } from 'react-multi-select-component';
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

const UpdateUser = () => {
  const { user, users, groups, setUsers } = useContext(
    AppContext
  ) as ContextType;
  const [singleUser, setSingleUser] = useState<IUser>({} as IUser);

  const [singleUserLocation, setSingleUserLocation] = useState<any>({});
  const [singleUserRole, setSingleUserRole] = useState<any>({});

  const selectOptions = groups.map((item) => ({
    label: item.name,
    value: item.id
  }));
  const [selectedGroups, setSelectedGroups] = useState<any>({});

  let { userId } = useParams();
  let location = useLocation().pathname.toLowerCase();
  const navigate = useNavigate();
  const cookieToken: string | undefined = Cookies.get('token');
  console.log(singleUser, 'initial user');

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
        const selectedGroupsBefore = response.data.groupsId.map(
          (group: number) => {
            let groupData = groups.find((item) => item.id === group);
            let selectedOption = {
              label: groupData?.name,
              value: group
            };
            return selectedOption;
          }
        );

        setSelectedGroups(selectedGroupsBefore);
      });
  }, [userId, cookieToken, groups]);

  const handleUpdateUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const selectedGroupsIds = selectedGroups.map((group: { value: any; }) => group.value);
    console.log(selectedGroupsIds, 'groups IDs in update user');

    console.log(selectedGroups, 'groups in update user');

    const updatedUser = {
      email: singleUser.email,
      fullName: singleUser.fullName,
      imageUrl: singleUser.imageUrl,
      role: singleUserRole.value,
      location: singleUserLocation.value,
      status: singleUser.status,
      groupsId: [...selectedGroupsIds]
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
      });
  };

  const handleChangeSelectedLocation = (selectedOption: any) => {
    setSingleUserLocation(selectedOption);
  };

  const handleChangeSelectedRole = (selectedOption: any) => {
    setSingleUserRole(selectedOption);
  };

  const handleChangeSelectedBootcamp = (selectedOption: any) => {
    setSelectedGroups(selectedOption);
  };
  return (
    <div className="container-xl">
      <Header role={user.role} location={location} />
      <div className="flex justify-center">
        <div className="max-w-6xl mx-2 w-full">
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
            {/* <Input options={groups} select multiple label="Group" /> */}
            <label className="text-pink-600 text-lg font-bold font-sans">
              Bootcamp
            </label>
            <div className=".dropdown-container">
              {/* <MultiSelect
                className="mb-4"
                options={selectOptions}
                value={selectedGroups}
                onChange={setSelectedGroups}
                labelledBy="Select"
              /> */}
              <Select
                className="mb-4 "
                classNamePrefix="single_select"
                onChange={handleChangeSelectedBootcamp}
                options={selectOptions}
                value={selectedGroups}
              />
            </div>
            {/* <Input value={singleUserRole} options={roleArr} select label="Role"  onChange={(e) => setSingleUserRole(e.target.value)} /> */}
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
        </div>
        <Footer role={user.role} image={user.imageUrl} />
      </div>
    </div>
  );
};

export default UpdateUser;
