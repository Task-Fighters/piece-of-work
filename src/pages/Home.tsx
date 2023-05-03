import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContextType } from '../types';
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
  // console.log(Date.now());
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
          <Input icon placeholder="Search" />
          <div className="flex flex-row flex-wrap justify-between">
            {assignments.map((assignment, index) => {
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
            })}
          </div>
          <Footer role={user.role} image={user.imageUrl} />
        </div>
      </div>
    </div>
  );
};

export default Home;
