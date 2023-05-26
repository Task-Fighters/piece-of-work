import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { ContextType } from '../types';
import Title from '../components/Title';
import { Input } from '../components/Input';
import { AppContext } from '../AppContext';
import { Button } from '../components/Button';
import Datepicker from '../components/Datepicker';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import { RiAsterisk } from 'react-icons/ri';
import {InputErrorAlert}  from '../components/InputErrorAlert';

const AddAssignment = () => {
  const { groups } = useContext(AppContext) as ContextType;
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const cookieToken: string | undefined = Cookies.get('token');

  const selectOptions = groups.map((item) => ({
    label: item.name,
    value: item.id
  }));
  const [selectedGroups, setSelectedGroups] = useState<any>({});

  const [isValid, setIsValid] = useState({
    title: false,
    startDate: false,
    description: false,
    groupId: false
  });
  const [toShowValidationError, setToShowValidationError] = useState(false)

  useEffect(() => {
    setIsValid({...isValid, 
      title: title ? true : false,
      startDate: startDate ? true : false,
      description: description ? true : false,
      groupId: selectedGroups.value ? true : false
    });
    // eslint-disable-next-line
  }, [title, startDate, description, selectedGroups]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    let newAssignment;
    if(isValid.startDate === true && isValid.title === true && isValid.description === true && isValid.groupId === true) {
      newAssignment = {
        title: title,
        startDate: startDate ,
        description: description,
        groupId: selectedGroups.value
      };
      axios
      .post(
        `https://project-salty-backend.azurewebsites.net/Assignments`,
        {
          ...newAssignment
        },
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
            Accept: 'text/plain'
          }
        }
      )
      .then((response) => {
        navigate(`/assignments/${response.data.id}`);
      });
    const target = e.target as HTMLFormElement;
    target.reset();
    setTitle('');
    setStartDate('');
    setDescription('');
    }
     else{
      setToShowValidationError(true)
    } 
  };

  const handleChangeGroup = (selectedOption: any) => {
    setSelectedGroups(selectedOption);
  };

  return (
    <form onSubmit={handleSubmit} id="formList">
      <Title underline title="Add New Assignment" />
      <Input
        label="Title"
        required={true}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <InputErrorAlert
      isValid={isValid.title}
      toShowValidationError={toShowValidationError}
      />
      <Datepicker
        value={startDate}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setStartDate(e.target.value)
        }
      />
       <InputErrorAlert
      isValid={isValid.startDate}
      toShowValidationError={toShowValidationError}
      />

      <label className="text-pink-600 text-lg font-bold font-sans flex items-center">
        Group <span>&nbsp;</span> <RiAsterisk className='text-[10px] text-red-500'/>
      </label>
      <div className=".dropdown-container">
        <Select
          className="mb-4 "
          classNamePrefix="single_select"
          onChange={handleChangeGroup}
          options={selectOptions}
          value={selectedGroups}
        />
      </div>
      <InputErrorAlert
      isValid={isValid.groupId}
      toShowValidationError={toShowValidationError}
      />
      <label className="text-pink-600 text-lg font-bold font-sans flex items-center">
        Details <span>&nbsp;</span> <RiAsterisk className='text-[10px] text-red-500'/>
      </label>
      <ReactQuill
        className="h-44 mb-14"
        theme="snow"
        value={description}
        onChange={(e) => setDescription(e)}
      />
      <InputErrorAlert
      isValid={isValid.description}
      toShowValidationError={toShowValidationError}
      />
      <div className="mb-32 mt-20 md:mt-0">
        <Button label="Add Assignment" type="submit"/>
      </div>
    </form>
  );
};

export default AddAssignment;