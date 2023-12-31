import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextType, RepoType } from 'types';
import { AppContext } from 'AppContext';
import { Repository } from 'components/Repository';
import Title from 'components/Title';
import { Button } from 'components/Button';
import UserDetails from 'components/UserDetails';
import axios from 'axios';
import Cookies from 'js-cookie';
import secureLocalStorage from 'react-secure-storage';
import { ListItem } from 'components/ListItem';

const Profile = () => {
  const { user, assignments, groups } = useContext(AppContext) as ContextType;
  const cookieToken: string | undefined = Cookies.get('token');
  const [repos, setRepos] = useState<RepoType[]>([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
    Cookies.remove('token');
    secureLocalStorage.clear();
  };

  const userGroups = user.groupsId?.map((group:any) => {
    let currentGroup = groups.find((item) => item.id === group);
    let groupObj = {
      id: group,
      name: currentGroup?.name
    };
    return groupObj;
  });

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
        }).catch((error) => { 
          navigate("/error")
        });
    }
    // eslint-disable-next-line
  }, [cookieToken, user.id]);

  const handleDeleteRepo = (e: React.MouseEvent<HTMLElement>, id: number) => {
    e.preventDefault();
      axios
        .delete(`https://project-salty-backend.azurewebsites.net/Repos/${id}`, {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
            Accept: 'text/plain'
          }
        })
        .then(() => {
          let newReposList = repos.filter((repo) => repo.id !== id);
          setRepos(newReposList);
        }).catch((error) => { 
          navigate("/error")
        });
  };
  return (
    <>
      <div className="flex justify-end">
        {user && (
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
        bootcamp={user.role === 'admin' ? 'Instructors group' : user.bootcamp}
      />
      {userGroups && userGroups.length > 0 && (
        <Title
          className="mx-2 md:mx-0 md:my-2"
          underline
          title={`Groups (${userGroups?.length})`}
        />
      )}
      <div className="flex flex-row flex-wrap justify-between mx-2 md:m-0">
        <ul className="flex flex-row flex-wrap justify-between capitalize gap-x-1 w-full">
          {userGroups?.map((group:any) => {
            return (
              <ListItem
                key={group?.id}
                id={group?.id}
                title={group?.name || ''}
                route={user.role === 'admin' ? `/groups` : ''}
              />
            );
          })}
        </ul>
      </div>

      {repos.length > 0 && (
        <Title
          className="mx-2 md:mx-0 md:my-2"
          underline
          title={`Completed Assignments (${repos?.length})`}
        />
      )}
      <div className="flex flex-row flex-wrap justify-between mx-2 md:m-0">
        {repos?.map((repo, index) => {
          const repoAssignment = assignments?.find(
            (assignment) => assignment.id === repo.assignmentId
          );
          return (
            <Repository
              id={repo.id}
              key={index}
              assignment={repoAssignment?.title || ''}
              repoUrl={repo.url}
              deleteIcon={true}
              assignmentUrl={repo.assignmentId}
              onClick={(e) => handleDeleteRepo(e, repo.id)}
            />
          );
        })}
      </div>
      <div className="flex justify-center mx-2 mt-4 mb-32">
        {user && (
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
    </>
  );
};

export default Profile;
