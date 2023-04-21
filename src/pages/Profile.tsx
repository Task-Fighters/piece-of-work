import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ContextType } from '../types';
import { AppContext } from '../AppContext';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Footer } from '../components/Footer';
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

  console.log(completedAssignments);
  let location = useLocation().pathname.toLowerCase();

  return (
    <div className="container-xl">
      <Header role={user.role} location={location} />
      <div className="flex justify-center">
        <div className="max-w-6xl md:mx-4">
          <UserDetails
            id={user.id}
            name={user.fullName}
            email={user.email}
            // groups={user.groupsId}
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
          <Footer role={user.role} image={user.imageURL} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
