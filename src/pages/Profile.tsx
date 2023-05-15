import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContextType } from '../types';
import { AppContext } from '../AppContext';
import { Header } from '../components/Header';
import { Repo } from '../components/Repo';
import { Footer } from '../components/Footer';
import Title from '../components/Title';
import { Button } from '../components/Button';
import UserDetails from '../components/UserDetails';
import axios from 'axios';
import Cookies from 'js-cookie';
import secureLocalStorage from 'react-secure-storage';

interface IRepo {
  id: number;
  assignmentId: number;
  assignment: string;
  url: string;
  title: string;
}

const Profile = () => {
  const { user, assignments } = useContext(AppContext) as ContextType;
  const cookieToken: string | undefined = Cookies.get('token');
  const [repos, setRepos] = useState<IRepo[]>([]);
  let location = useLocation().pathname.toLowerCase();
  const navigate = useNavigate();
  const handleLogout = () => {
    secureLocalStorage.removeItem('id');
    secureLocalStorage.removeItem('role');
    navigate('/');
  };

  useEffect(() => {
    if (user.id !== undefined) {
      axios
        .get(
          `https://project-salty-backend.azurewebsites.net/Repos/User/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${cookieToken}`,
              Accept: 'text/plain'
            }
          }
        )
        .then((response) => {
          setRepos(response.data);
        });
    }
  }, [cookieToken, user.id]);

  return (
    <div className="container-xl">
      <Header role={user.role} location={location} />
      <div className="flex justify-center">
        <div className="max-w-6xl w-full md:mx-2 ">
          <div className="flex justify-end">
            {user.role === 'admin' && (
              <div className="w-48 hidden md:flex">
                <Button
                  buttonColor="pink"
                  type="button"
                  label="Logout"
                  className=" hover:bg-pink-600 hover:text-white"
                  onClick={handleLogout}
                />
              </div>
            )}
          </div>
          <UserDetails
            id={user.id}
            name={user.fullName}
            email={user.email}
            location={user.location}
            imageUrl={user.imageUrl}
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
          <div className="flex justify-center mx-2 mt-4 mb-32">
            {user.role === 'admin' && (
              <div className="w-full md:hidden flex">
                <Button
                  label="Logout"
                  type="button"
                  className="bg-pink-600 border-pink-600 text-white border-"
                  onClick={handleLogout}
                />
              </div>
            )}
          </div>
          <Footer role={user.role} image={user.imageUrl} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
