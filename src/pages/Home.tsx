import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextType, IAssignment } from '../types';
import { AppContext } from '../AppContext';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import Title from '../components/Title';

const Home = () => {
  const { user, assignments, groups } = useContext(AppContext) as ContextType;
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const currentDate = new Date().toJSON();

  const newAssignments = assignments
    .filter(
      (assignment) =>
        new Date(assignment.startDate).getTime() < new Date().getTime()
    )
    .sort((a: IAssignment, b: IAssignment) => {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });

  if (newAssignments.length > 0) {
    const newestStartDate = newAssignments[0].startDate;
    newAssignments.forEach((assignment) => {
      assignment.startDate = newestStartDate;
    });
  }

  const upcomingAssignments = assignments
    .filter(
      (assignment) =>
        new Date(assignment.startDate).getTime() >= new Date().getTime()
    )
    .sort((a: IAssignment, b: IAssignment) => {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

  const feature = newAssignments.find(
    (assignment) =>
      new Date(assignment.startDate).getTime() < new Date(currentDate).getTime()
  );

  const nonFeatured = newAssignments.filter(
    (assignment) => assignment.startDate !== feature?.startDate
  );

  const featured = newAssignments.filter(
    (assignment) => assignment.startDate === feature?.startDate
  );

  let assignmentToShow: IAssignment[] = [];

  if (user.role !== 'admin') {
    const filtered = nonFeatured.filter(
      (assignment) =>
        new Date(assignment.startDate).getTime() <
        new Date(currentDate).getTime()
    );
    assignmentToShow = featured.concat(filtered);
  } else {
    assignmentToShow = featured.concat(nonFeatured);
  }

  return (
    <>
      <div className="float-right">
        {user.role === 'admin' && (
          <div className="w-48 hidden md:flex">
            <Button
              buttonColor="white"
              label="Add new Assignment"
              type="button"
              onClick={() => {
                navigate('/assignments/new');
              }}
            />
          </div>
        )}
      </div>
      <Input
        icon
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex flex-row flex-wrap justify-between mb-6">
        {assignmentToShow
          .filter((assignment) => {
            return (
              search === '' ||
              assignment.title.toLowerCase().includes(search.toLowerCase())
            );
          })
          .map((assignment, index) => {
            const groupName = groups.find(
              (group) => group.id === assignment.groupId
            )?.name;
            return (
              <Card
                cardType={
                  assignment.startDate === feature?.startDate
                    ? 'feature'
                    : 'card'
                }
                id={assignment.id}
                key={index}
                description={assignment.description}
                subtitle={assignment.startDate}
                title={assignment.title}
                group={groupName}
              />
            );
          })}
      </div>
      {user.role === 'admin' && (
        <Title
          className="mx-2 md:mx-0 md:my-2"
          underline
          title={`Upcoming Assignments (${upcomingAssignments?.length})`}
        />
      )}
      {user.role === 'admin' && (
        <div className="flex flex-row flex-wrap justify-between mb-6">
          {upcomingAssignments
            .filter((assignment) => {
              return (
                new Date(assignment.startDate).getTime() >
                  new Date(currentDate).getTime() &&
                (search === '' ||
                  assignment.title.toLowerCase().includes(search.toLowerCase()))
              );
            })
            .map((assignment, index) => {
              const groupName = groups.find(
                (group) => group.id === assignment.groupId
              )?.name;
              return (
                <Card
                  cardType={'card'}
                  id={assignment.id}
                  key={index}
                  description={assignment.description}
                  subtitle={assignment.startDate}
                  title={assignment.title}
                  group={groupName}
                />
              );
            })}
        </div>
      )}
      <Title
        className="mx-2 md:mx-0 md:my-2"
        underline
        title={`Past Assignments`}
      />
      <div
        className={
          upcomingAssignments?.length > 0
            ? 'flex flex-row flex-wrap justify-between mb-6'
            : 'flex flex-row flex-wrap justify-between mb-32'
        }
      ></div>
    </>
  );
};

export default Home;
