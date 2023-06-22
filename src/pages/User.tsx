import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserType, ContextType, RepoType } from '../types';
import Cookies from 'js-cookie';
import { AppContext } from '../AppContext';
import Title from '../components/Title';
import UserDetails from '../components/UserDetails';
import { Repository } from '../components/Repository';
import { ListItem } from '../components/ListItem';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const { user, assignments, groups } = useContext(AppContext) as ContextType;
  const [singleUser, setSingleUser] = useState<UserType>({} as UserType);
  let { userId } = useParams();
  const [repos, setRepos] = useState<RepoType[]>([]);
  const cookieToken: string | undefined = Cookies.get('token');
  const navigate = useNavigate();
  const userGroups = singleUser?.groupsId?.map((group) => {
    let currentGroup = groups.find((item) => item.id === group);
    let groupObj = {
      id: group,
      name: currentGroup?.name,
    };
    return groupObj;
  });

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
      })
      .catch((error) => {
        navigate('/error');
      });
    // eslint-disable-next-line
  }, [userId, cookieToken]);

  useEffect(() => {
    axios
      .get(
        `https://project-salty-backend.azurewebsites.net/Repos/User/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
            Accept: 'text/plain'
          }
        }
      )
      .then((response) => {
        setRepos(response.data);
      })
      .catch((error) => {
        navigate('/error');
      });
    // eslint-disable-next-line
  }, [cookieToken, userId]);

  return (
    <>
      <UserDetails
        id={singleUser.id}
        name={singleUser.fullName}
        email={singleUser.email}
        imageUrl={singleUser.imageUrl}
        location={singleUser.location}
        bootcamp={
          singleUser.role === 'admin' ? 'Instructors group' : singleUser.bootcamp
        }
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
          {userGroups?.map((group, index) => {
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
          const name = assignments.find(
            (assign) => assign.id === repo.assignmentId
          )?.title;
          return (
            <Repository
              id={repo.id}
              key={index}
              assignment={name || ''}
              repoUrl={repo.url}
              assignmentUrl={repo.assignmentId}
            />
          );
        })}
      </div>
    </>
  );
};

export default User;
