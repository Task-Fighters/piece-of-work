import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { IUser, ContextType } from '../types';
import Cookies from 'js-cookie';
import { AppContext } from '../AppContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import Title from '../components/Title';
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
  const { user, assignments } = useContext(AppContext) as ContextType;
  const [singleUser, setSingleUser] = useState<IUser>({} as IUser);
  let { userId } = useParams();
  const [repos, setRepos] = useState<IRepo[]>([]);
  let location = useLocation().pathname.toLowerCase();
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
            bootcamp={singleUser.role === "admin" ? "Instructors group" : user.bootcamp}
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
          <Footer role={user.role} image={singleUser.imageUrl} />
        </div>
      </div>
    </div>
  );
};

export default User;
