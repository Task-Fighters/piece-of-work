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

  const filteredAssigments = assignments.filter((assignment) => {
    return (
      search === '' ||
      assignment.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  const featuredAssignments = filteredAssigments
    .filter(
      (assignment) =>
        new Date(assignment.startDate).getTime() <= new Date().getTime()
    )
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )
    .filter((assignment, index, array) => {
      const currentDate = new Date(assignment.startDate).toDateString();
      const previousAssignment = index > 0 ? array[index - 1] : null;

      if (previousAssignment) {
        const previousDate = new Date(
          previousAssignment.startDate
        ).toDateString();
        return currentDate === previousDate;
      }
      return true;
    });

  const upcomingAssignments = filteredAssigments
    .filter(
      (assignment) =>
        new Date(assignment.startDate).getTime() > new Date().getTime()
    )
    .sort((a: IAssignment, b: IAssignment) => {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

  const pastAssignments = filteredAssigments
    .filter(
      (assignment) =>
        new Date(assignment.startDate).getTime() <= new Date().getTime() &&
        !featuredAssignments.includes(assignment)
    )
    .sort((a: IAssignment, b: IAssignment) => {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });

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
        {featuredAssignments.map((assignment, index) => {
          const groupName = groups.find(
            (group) => group.id === assignment.groupId
          )?.name;
          return (
            <Card
              cardType="feature"
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
          {upcomingAssignments.map((assignment, index) => {
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
        title={`Past Assignments (${pastAssignments?.length})`}
      />
      <div className="flex flex-row flex-wrap justify-between mb-32">
        {pastAssignments.map((assignment, index) => {
          const groupName = groups.find(
            (group) => group.id === assignment.groupId
          )?.name;
          return (
            <Card
              cardType="card"
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
    </>
  );
};

export default Home;
