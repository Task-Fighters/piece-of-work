import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://project-salty-backend.azurewebsites.net/Repos/User/${user.id}`,
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
                />
              </div>
            )}
          </div>
          <UserDetails
            id={user.id}
            name={user.fullName}
            email={user.email}
            imageUrl={user.imageUrl}
          />
          <Title
            className="mx-2 md:mx-0 md:my-2"
            underline
            title={`Completed Assignments (${repos?.length})`}
          />
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
          <div className="flex justify-center mx-2 mb-32">
            {user.role === 'admin' && (
              <div className="w-full md:hidden flex">
                <Button
                  label="Logout"
                  type="button"
                  className="bg-pink-600 border-pink-600 text-white border-"
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
