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
// import { ListItem } from '../components/ListItem';

const Assignment = () => {
  const { user } = useContext(AppContext) as ContextType;
  const [assignment, setAssignment] = useState<IAssignment>({} as IAssignment);
  const cookieToken: string | undefined = Cookies.get('token');
  let { assignmentId } = useParams();
  let location = useLocation().pathname.toLowerCase();
  const navigate = useNavigate();
  // let assignment = assignments?.find(
  //   (assignment) => assignment.id === Number(assignmentId)
  // );

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
  //Add filter to render only assignments from the group that user is linked to.

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
          {user.role === 'user' && (
            <>
              <Title title="Post completed assignment" />
              <div className="flex flex-col md:flex-row">
                <Input placeholder="Git Repository URL" />
                <Button
                  className="md:w-1/4 md:ml-2"
                  label="Submit"
                  type="button"
                  onClick={() => {}}
                />
              </div>
            </>
          )}

          {/* <Title
            title={`Completed assignments (${assignment?.submission.length})`}
            // Correct the number of assignments after implementation on the backend ${assignment?.submission.length}
          />
          <ul className="flex flex-row flex-wrap justify-between">
            {assignment?.submission.map((user) => {
              return (
                <ListItem
                  key={user.userId}
                  id={user.userId}
                  title={user.name}
                  route="/users"
                />
              );
            })}
          </ul> */}
          <Footer role={user.role} image={user.imageUrl} />
        </div>
      </div>
    </div>
  );
};

export default Assignment;
