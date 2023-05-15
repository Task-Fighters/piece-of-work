import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { IUser, ContextType } from '../types';
import Cookies from 'js-cookie';
import { AppContext } from '../AppContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import Title from '../components/Title';
import { Button } from '../components/Button';
import UserDetails from '../components/UserDetails';
import { Repo } from '../components/Repo';

interface IRepo {
  id: number;
  assignmentId: number;
  assignment: string;
  url: string;
  title: string;
}

const User = () => {
  const { user, users, setUsers, assignments } = useContext(
    AppContext
  ) as ContextType;
  const [singleUser, setSingleUser] = useState<IUser>({} as IUser);
  let { userId } = useParams();
  const [repos, setRepos] = useState<IRepo[]>([]);
  let location = useLocation().pathname.toLowerCase();
  const cookieToken: string | undefined = Cookies.get('token');
  const navigate = useNavigate();

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
      });
  }, [userId, cookieToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://project-salty-backend.azurewebsites.net/Repos/User/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${cookieToken}`,
              Accept: 'text/plain'
            }
          }
        );
        setRepos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [cookieToken, userId]);

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
        navigate('/users');
      });
  };

  return (
    <div className="container-xl">
      <Header role={user.role} location={location} />
      <div className="flex justify-center">
        <div className="max-w-6xl w-full md:mx-2 ">
          <UserDetails
            id={singleUser.id}
            name={singleUser.fullName}
            email={singleUser.email}
            imageUrl={singleUser.imageUrl}
            location={singleUser.location}
            // groups={user.groupsId}
          />
          {repos.length > 0 && (
            <Title
              className="mx-2 md:mx-0 md:my-2"
              underline
              title={`Completed Assignments (${repos?.length})`}
            />
          )}
          <div className="flex flex-row flex-wrap justify-between mx-2 md:m-0">
            {repos?.map((repo, index) => {
              const name = assignments.find(
                (assign) => assign.id === repo.assignmentId
              )?.title;
              return (
                <Repo
                  id={repo.id}
                  key={index}
                  assignment={name || ''}
                  repoUrl={repo.url}
                  assignmentUrl={repo.assignmentId}
                />
              );
            })}
          </div>
          <div className="mb-32 mt-4 mx-2 md:mt-0">
            {user.role === 'admin' && (
              <Button
                label="Delete user"
                type="button"
                className="bg-pink-600 border-pink-600 text-white border-"
                onClick={(e) => {
                  handleDeleteUser(e);
                }}
              />
            )}
          </div>
          <Footer role={user.role} image={singleUser.imageUrl} />
        </div>
      </div>
    </div>
  );
};

export default User;
