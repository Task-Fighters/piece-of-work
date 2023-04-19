import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ContextType } from '../types';
import { AppContext } from '../AppContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import Title from '../components/Title';

const Assignment = () => {
  const { user, assignments } = useContext(AppContext) as ContextType;
  let { assignmentId } = useParams();
  let assignment = assignments?.find(
    (assignment) => assignment.id === Number(assignmentId)
  );

  return (
    <div className="container-xl">
      <Header />
      <div className="flex justify-center">
        <div className="max-w-6xl mx-2">
          <div className="float-right">
            {user.role === 'admin' && (
              <div className="w-48 hidden md:flex">
                <Button
                  buttonColor="white"
                  label="Add new Assignment"
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
          <Title title="Completed assignments" />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Assignment;
