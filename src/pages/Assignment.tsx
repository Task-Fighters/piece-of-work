import { useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ContextType } from '../types';
import { AppContext } from '../AppContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import Title from '../components/Title';
import { ListItem } from '../components/ListItem';

const Assignment = () => {
  const { user, assignments } = useContext(AppContext) as ContextType;

  let { assignmentId } = useParams();
  let location = useLocation().pathname.toLowerCase();
  let assignment = assignments?.find(
    (assignment) => assignment.id === Number(assignmentId)
  );

  return (
    <div className="container-xl">
      <Header role={user.role} location={location} />
      <div className="flex justify-center">
        <div className="max-w-6xl mx-2">
          <div className="flex justify-end">
            {user.role === 'admin' && (
              <div className="w-48 hidden md:flex">
                <Button
                  buttonColor="white"
                  label="Add New Assignment"
                  onClick={() => {}}
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
            <Input placeholder="Git Repository URL" />
            <Button
              className="md:w-1/4 md:ml-2"
              label="Submit"
              onClick={() => {}}
            />
          </div>
          <Title
            title={`Completed assignments (${assignment?.submission.length})`}
          />
          <ul className="flex flex-row flex-wrap justify-between">
            {assignment?.submission.map((user) => {
              return (
                <ListItem
                  key={user.userId}
                  id={user.userId}
                  title={user.name}
                  route="/user"
                />
              );
            })}
          </ul>
          <Footer role={user.role} image={user.imageURL} />
        </div>
      </div>
    </div>
  );
};

export default Assignment;
