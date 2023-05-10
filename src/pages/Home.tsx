import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContextType, IAssignment } from '../types';
import { AppContext } from '../AppContext';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Footer } from '../components/Footer';

const Home = () => {
  const { user, assignments } = useContext(AppContext) as ContextType;
  const navigate = useNavigate();
  let location = useLocation().pathname.toLowerCase();
  // show newest assignment, do not show future ass. (only for students)
  const currentDate = new Date().toJSON();
  const [search, setSearch] = useState('');
  const newAssignments = assignments.sort((a: IAssignment, b: IAssignment) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  const feature = newAssignments.find(
    (assignment) =>
      new Date(assignment.startDate).getTime() > new Date(currentDate).getTime()
  );

  if (feature) {
    const index = newAssignments.indexOf(feature);
    newAssignments.unshift(feature);
    newAssignments.splice(index + 1, 1);
  }
  return (
    <div className="container-xl">
      <Header role={user.role} location={location} />
      <div className="flex justify-center">
        <div className="max-w-6xl mx-2 w-full">
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
            {newAssignments.map((assignment, index) => {
              if (
                search === '' ||
                assignment.title.toLowerCase().includes(search.toLowerCase())
              )
                return (
                  <Card
                    cardType={index === 0 ? 'feature' : 'card'}
                    id={assignment.id}
                    key={index}
                    description={assignment.description}
                    subtitle={assignment.startDate}
                    title={assignment.title}
                  />
                );
                return (<div key ={index}></div>)
            }
           )}
          </div>
          <Footer role={user.role} image={user.imageUrl} />
        </div>
      </div>
    </div>
  );
};

export default Home;
