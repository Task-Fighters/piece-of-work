import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AppContext } from '../AppContext';
import { IAssignment, ContextType } from '../types';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import Title from '../components/Title';
import { ListItem } from '../components/ListItem';

interface IRepo {
  userId: number;
  title: string;
}

const Assignment = () => {
  const { user, users } = useContext(AppContext) as ContextType;
  const [assignment, setAssignment] = useState<IAssignment>({} as IAssignment);
  const [repoName, setRepoName] = useState<string>('');
  const [repos, setRepos] = useState<IRepo[]>([]);
  const cookieToken: string | undefined = Cookies.get('token');
  let { assignmentId } = useParams();
  let location = useLocation().pathname.toLowerCase();
  const navigate = useNavigate();

  useEffect(() => {
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
      });
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
      });
  }, [assignmentId, cookieToken, repoName]);

  const addRepo = () => {
    if (repoName?.trim() === '') {
      return;
    }
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
        console.log(response.data);
        setRepoName('');
      });
  };

  return (
    <div className="container-xl">
      <Header role={user.role} location={location} />
      <div className="flex justify-center">
        <div className="max-w-6xl mx-2 w-full">
          <div className="flex justify-end">
            {user.role === 'admin' && (
              <div className="w-48 hidden md:flex">
                <Button
                  buttonColor="white"
                  label="Edit Assignment"
                  type="button"
                  onClick={() => {
                    navigate(`/assignments/${assignmentId}/update`);
                  }}
                />
              </div>
            )}
          </div>
          {assignment && (
            <Card
              cardType="detailed"
              description={assignment.description}
              subtitle={assignment.startDate}
              title={assignment.title}
            />
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
          <Title title={`Completed assignments (${repos?.length})`} />
          <ul className="flex flex-row flex-wrap justify-between">
            {repos?.map((repo) => {
              const userName = users.find(
                (user) => user.id === repo.userId
              )?.fullName;
              return (
                <ListItem
                  key={repo.userId}
                  id={repo.userId}
                  title={userName || ''}
                  route="/users"
                />
              );
            })}
          </ul>

          <Footer role={user.role} image={user.imageUrl} />
        </div>
      </div>
    </div>
  );
};

export default Assignment;
