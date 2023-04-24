import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ContextType } from '../types';
import { AppContext } from '../AppContext';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Footer } from '../components/Footer';
import Title from '../components/Title';
import { Button } from '../components/Button';
import UserDetails from '../components/UserDetails';

const Profile = () => {
  const { user, assignments } = useContext(AppContext) as ContextType;
  let completedAssignments: any = [];
  assignments.forEach((assignment) => {
    assignment.submission.forEach((item) => {
      if (item.userId === user.id) {
        completedAssignments.push(assignment);
      }
    });
  });

  let location = useLocation().pathname.toLowerCase();

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
            // groups={user.groupsId}
          />
          <Title
            className="mx-2 md:mx-0 md:my-2"
            underline
            title="Completed Assignments"
          />
          <div className="flex flex-row flex-wrap justify-between mx-2 md:m-0">
            {assignments.map((assignment, index) => {
              return (
                <Card
                  cardType={'card'}
                  id={assignment.id}
                  key={index}
                  description={assignment.description}
                  subtitle={assignment.startDate}
                  title={assignment.title}
                />
              );
            })}
          </div>
          <div className="flex justify-center mx-2 mb-32">
            {user.role === 'admin' && (
              <div className="w-full md:hidden flex">
                <Button
                  label="Logout"
                  className="bg-pink-600 border-pink-600 text-white border-"
                />
              </div>
            )}
          </div>
          <Footer role={user.role} image={user.imageURL} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
