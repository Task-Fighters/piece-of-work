import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import axios from 'axios';
import Cookies from 'js-cookie';
import Title from '../components/Title';
import { MultiSelect } from 'react-multi-select-component';
import { AppContext } from '../AppContext';
import { ContextType } from '../types';
import {InputErrorAlert}  from '../components/InputErrorAlert';

const AddGroup = () => {
  const {users } = useContext(AppContext) as ContextType;
  const [groupName, setGroupName] = useState('');
  const navigate = useNavigate();
  const cookieToken: string | undefined = Cookies.get('token');
  const selectOptions = users?.map(item => (
    {
      label: item.email,
      value: item.id,
      disabled: false
    }
));

const [selected, setSelected] = useState([]);
const selectedUsersIds = selected.map((user: { value: any; }) => user.value);

const [isValid, setIsValid] = useState({
  groupName: false,
});
const [toShowValidationError, setToShowValidationError] = useState(false)


useEffect(() => {
  setIsValid({...isValid, 
    groupName: groupName ? true : false,
  });
  // eslint-disable-next-line
}, [groupName]);

  const addGroup = () => {
    // if (groupName.trim() === '') {
    //   return;
    // }
    if(isValid.groupName === true) {
    axios
      .post(
        `https://project-salty-backend.azurewebsites.net/Groups`,
        {
          name: groupName,
          userIds: selectedUsersIds,
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
    } else {
      setToShowValidationError(true)
    }
  };

  return (
    <>
      <Title underline title="Add New Group" />
      <Input
        label="Group Name"
        value={groupName}
        required={true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setGroupName(e.target.value)
        }
      />
      <InputErrorAlert
      isValid={isValid.groupName}
      toShowValidationError={toShowValidationError}
      />
      <label className="text-pink-600 text-lg font-bold font-sans">
        User E-mail Address            
      </label>
      
      <div className=".dropdown-container mb-4">
      <MultiSelect
        options={selectOptions}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
      </div>
      <div className="mb-4">
        <Button label="Add Group" onClick={addGroup} type="button" />
      </div>
    </>
  );
};

export default AddGroup;


