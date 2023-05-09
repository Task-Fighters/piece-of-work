import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext, useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { IUser, ContextType, IRole, ILocation} from '../types';
import { AppContext } from '../AppContext';
import Title from '../components/Title';
import { Input } from '../components/Input';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { MultiSelect } from 'react-multi-select-component';


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

const UpdateUser = () => {
  const { user, users, groups, setUsers } = useContext(AppContext) as ContextType;
  const [singleUser, setSingleUser] = useState<IUser>({} as IUser);
  const [userLocation, setUserLocation] = useState(singleUser.location);
  const [role, setRole] = useState(singleUser.role);
  const selectOptions = groups.map((item) => ({
    label: item.name,
    value: item.id
  }));
  const [selectedGroups, setSelectedGroups] = useState(selectOptions);
  const selectedGroupsIds = selectedGroups.map((group) => group.value);

  let { userId } = useParams();
  let location = useLocation().pathname.toLowerCase();
  const navigate = useNavigate();
  const cookieToken: string | undefined = Cookies.get('token');

  useEffect(() => {
    axios
      .get(
        `https://project-salty-backend.azurewebsites.net/Users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
            Accept: 'text/plain'
          }
        }
      )
      .then((response) => {
        setSingleUser(response.data);
      });
  }, [userId, cookieToken]);

  const handleUpdateUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/users/${userId}`)
  }

  console.log(singleUser);

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
        setUsers(users.filter(user => user.id !== Number(userId)));
        navigate("/users")
      });
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
              <p className='text-sm font-bold font-roboto'>{singleUser.email}</p>
            </div>
            <Input  value={userLocation} options={locationArr} select label="Location"  onChange={(e) => setUserLocation(e.target.value)} />
            {/* <Input options={groups} select multiple label="Group" /> */}
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
            <Input  value={role} options={roleArr} select label="Role"  onChange={(e) => setRole(e.target.value)} />
            <div>
              <Button label="Update User" type="button"  onClick={(e) => {handleUpdateUser(e)}}/>
            </div>
            <div className="mb-32">
              <Button buttonColor="pink" label="Delete User" type="button"  onClick={(e) => {
                    handleDeleteUser(e)
                  }}/>
            </div>
          </form>
        </div>
        <Footer role={user.role} image={user.imageUrl} />
      </div>
    </div>
  );
};

export default UpdateUser;
