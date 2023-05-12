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

  const [singleUserLocation, setSingleUserLocation] = useState("");
  const [singleUserFullName, setSingleUserFullName] = useState("");
  const [singleUserRole, setSingleUserRole] = useState("");

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
  const getUserName = () => {
    if(singleUser.fullName === "string" || "") {
    const name = singleUser.email.split('@')[0].split('.');
    const firstName = name[0].charAt(0).toUpperCase() + name[0].slice(1);
    const lastName = name[1].charAt(0).toUpperCase() + name[1].slice(1);
    const fullName = `${firstName} ${lastName}`;
    setSingleUserFullName(fullName)
    return
     } 
     return
  }

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
        console.log(response.data);
        setSingleUserLocation(response.data.location);
        setSingleUserRole(response.data.role);
      });
  }, [userId, cookieToken]);

  useEffect(() => {
    getUserName()
  }, [singleUser]);


  const handleUpdateUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    const updatedUser = {
      email: singleUser.email,
      fullName: singleUserFullName,
      imageUrl: singleUser.imageUrl,
      role: singleUserRole,
      location: singleUserLocation,
      status: singleUser.status,
      groupsId: [...selectedGroupsIds]
    }
    console.log(updatedUser, "update")
    console.log(singleUserLocation, "update")
    axios
      .put(
        `https://project-salty-backend.azurewebsites.net/Users/update/${userId}`,
        {...updatedUser},
      {
        headers: {
          Authorization: `Bearer ${cookieToken}`,
          Accept: 'text/plain'
        }
      }
      )
      .then((response) => {
        console.log(response.statusText);
        // setUsers(users.map(user => {
        //   user.id === Number(userId)}));
        navigate(`/users/${userId}`)
      }
      );

  }

  // console.log(singleUser, "initial user");
  // console.log(singleUserRole, "single user role");
  console.log(singleUser, "single user location");

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
                title={singleUserFullName}
              />
              <p className='text-sm font-bold font-roboto'>{singleUser.email}</p>
            </div>
            <Input value={singleUserLocation} options={locationArr} select label="Location"  onChange={(e) => setSingleUserLocation(e.target.value)} />
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
            <Input value={singleUserRole} options={roleArr} select label="Role"  onChange={(e) => setSingleUserRole(e.target.value)} />
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
