import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import axios from 'axios';
import Cookies from 'js-cookie';
import Title from '../components/Title';

const AddGroup = () => {
  const [groupName, setGroupName] = useState('');
  const navigate = useNavigate();
  const cookieToken: string | undefined = Cookies.get('token');

  const addGroup = () => {
    if (groupName.trim() === '') {
      return;
    }
    axios
      .post(
        `https://project-salty-backend.azurewebsites.net/Groups`,
        {
          name: groupName
        },
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
            Accept: 'text/plain'
          }
        }
      )
      .then((response) => {
        setGroupName('');
        navigate(`/groups/${response.data.id}`);
      });
  };

  return (
    <>
      <Title underline title="Add New Group" />
      <Input
        label="Group Name"
        value={groupName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setGroupName(e.target.value)
        }
      />
      <div className="mb-4">
        <Button label="Add Group" onClick={addGroup} type="button" />
      </div>
    </>
  );
};

export default AddGroup;
