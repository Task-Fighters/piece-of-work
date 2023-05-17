import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextType, IAssignment } from '../types';
import { AppContext } from '../AppContext';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const Home = () => {
  const { user, assignments } = useContext(AppContext) as ContextType;
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const currentDate = new Date().toJSON();
  const newAssignments = assignments.sort((a: IAssignment, b: IAssignment) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
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
      <div className="flex flex-row flex-wrap justify-between mb-32">
        {assignmentToShow?.map((assignment, index) => {
          if (
            search === '' ||
            assignment.title.toLowerCase().includes(search.toLowerCase())
          )
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
              />
            );

          return <div key={index}></div>;
        })}
      </div>
    </>
  );
};

export default Home;
