import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { ContextType } from '../types';
import axios from 'axios';
import Title from '../components/Title';
import { AppContext } from '../AppContext';

const AddGroup = () => {
  const { user } = useContext(AppContext) as ContextType;
  const [groupName, setGroupName] = useState('');
  let location = useLocation().pathname.toLowerCase();

  const addGroup = () => {
    if (groupName.trim() === '') {
      return;
    }
    axios
      .post(`https://project-salty-backend.azurewebsites.net/Groups`, {
        name: groupName
      })
      .then((response) => {
        console.log(response);
        setGroupName('');
      });
  };

  return (
    <div className="container-xl">
      <Header role={user.role} location={location} />
      <div className="flex justify-center">
        <div className="max-w-6xl w-full mx-2">
          <Title underline title="Add New Group" />
          <Input
            label="Group Name"
            value={groupName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setGroupName(e.target.value)
            }
          />
          <div className="mb-4">
            <Button label="Add Group" onClick={addGroup} />
          </div>
          <Footer role={user.role} image={user.imageUrl} />
        </div>
      </div>
    </div>
  );
};

export default AddGroup;
