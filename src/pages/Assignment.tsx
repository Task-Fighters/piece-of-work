import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AppContext } from '../AppContext';
import { IAssignment, ContextType } from '../types';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import Title from '../components/Title';
import { ListItem } from '../components/ListItem';
import SkeletonCard from '../components/SkeletonCard';
import { InputErrorAlert } from '../components/InputErrorAlert';

interface IRepo {
  userId: number;
  id: number;
  title: string;
}

const Assignment = () => {
  const { user, users, groups } = useContext(AppContext) as ContextType;
  const [assignment, setAssignment] = useState<IAssignment>({} as IAssignment);
  const [repoName, setRepoName] = useState<string>('');
  const [repos, setRepos] = useState<IRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState({
    repoLink: false,
  });
  const [toShowValidationError, setToShowValidationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const cookieToken: string | undefined = Cookies.get('token');
  let { assignmentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsValid({
      ...isValid,
      repoLink: repoName ? true : false,
    });
    // eslint-disable-next-line
  }, [repoName]);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(
          `https://project-salty-backend.azurewebsites.net/Assignments/${assignmentId}`,
          {
            headers: {
              Authorization: `Bearer ${cookieToken}`,
              Accept: 'text/plain'
            }
          }
        )
        .then((response) => {
          setAssignment(response.data);
          setIsLoading(false);
        }).catch((error) => { 
          console.log('Something went wrong')
          navigate("/error")
        });
    }, 500);
    // eslint-disable-next-line
  }, [assignmentId, cookieToken]);

  useEffect(() => {
    axios
      .get(
        `https://project-salty-backend.azurewebsites.net/Repos/Assignment/${assignmentId}`,
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
      // eslint-disable-next-line
  }, [assignmentId, cookieToken, repoName]);

  const addRepo = () => {
    if (isValid.repoLink === true) {
       axios
        .post(
          `https://project-salty-backend.azurewebsites.net/Repos`,
          {
            url: repoName,
            assignmentId: assignmentId,
            userId: user.id
          },
          {
            headers: {
              Authorization: `Bearer ${cookieToken}`,
              Accept: 'text/plain'
            }
          }
        )
        .then((response) => {
          setRepoName('');
        }).catch((error) => { 
          console.clear()
          setRepoName('');
          setIsValid({
            ...isValid,
            repoLink: false,
          });
          setErrorMessage('You already submitted an assignment')
          setToShowValidationError(true);
          setTimeout(() => {
            setToShowValidationError(false);
          }, 1000);
        });
      } else {
        setErrorMessage('Please fill in the field')
        setToShowValidationError(true);
      }
  };

  const groupName = groups.find(
    (group) => group.id === assignment.groupId
  )?.name;

  return (
    <>
      <div className="flex justify-end">
        {user.role === 'admin' && (
          <>
            <div className="md:hidden w-full">
              <Button
                buttonColor="white"
                label="Assign to group"
                type="button"
                onClick={() => {
                  navigate(`/assignments/${assignmentId}/assign`);
                }}
              />
            </div>
            <div className="w-48 hidden md:flex md:flex-col">
              <Button
                buttonColor="white"
                label="Assign to group"
                type="button"
                onClick={() => {
                  navigate(`/assignments/${assignmentId}/assign`);
                }}
              />
            </div>
          </>
        )}
      </div>
      {!isLoading ? (
        assignment && (
          <Card
            cardType="detailed"
            description={assignment.description}
            subtitle={assignment.startDate}
            title={assignment.title}
            group={groupName}
            pointer={false}
            iconEdit={user.role === 'admin' ? true : false}
            onClickEditIcon={(e: React.MouseEvent<HTMLElement>) => {
              navigate(`/assignments/${assignmentId}/update`);
            }}
          />
        )
      ) : (
        <SkeletonCard title="" subtitle="" description="" />
      )}
      <Title title="Post completed assignment" />
      <div className="flex flex-col md:flex-row">
        <Input
          placeholder="Git Repository URL"
          value={repoName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRepoName(e.target.value)
          }
        />
        <Button
          className="md:w-1/4 md:ml-2"
          label="Submit"
          type="button"
          onClick={addRepo}
        />
      </div>
      <InputErrorAlert
      isValid = {isValid.repoLink}
      toShowValidationError ={toShowValidationError}
      errorMessage={errorMessage}
      />

      {repos?.length > 0 && (
        <Title title={`Completed Assignments (${repos?.length})`} />
      )}
      <ul className="flex flex-row flex-wrap justify-between mb-32">
        {repos?.map((repo) => {
          const userName = users.find(
            (user) => user.id === repo.userId
          )?.fullName;
          return (
            <ListItem
              key={repo.id}
              id={repo.userId}
              title={userName || ''}
              route="/users"
            />
          );
        })}
      </ul>
    </>
  );
};

export default Assignment;
