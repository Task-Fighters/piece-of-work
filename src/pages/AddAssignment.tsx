import React, { useContext, useState } from 'react';
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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newAssignment = {
      title: title,
      startDate: startDate,
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
  };

  const handleChangeGroup = (selectedOption: any) => {
    setSelectedGroups(selectedOption);
  };

  return (
    <form onSubmit={handleSubmit} id="formList">
      <Title underline title="Add New Assignment" />
      <Input
        label="Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <Datepicker
        value={startDate}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setStartDate(e.target.value)
        }
      />
      <label className="text-pink-600 text-lg font-bold font-sans">Group</label>
      <div className=".dropdown-container">
        <Select
          className="mb-4 "
          classNamePrefix="single_select"
          onChange={handleChangeGroup}
          options={selectOptions}
          value={selectedGroups}
          required={true}
          form="formList"
        />
      </div>
      <label className="text-pink-600 text-lg font-bold font-sans">
        Details
      </label>
      <ReactQuill
        className="h-44 mb-14"
        theme="snow"
        value={description}
        onChange={(e) => setDescription(e)}
      />
      <div className="mb-32 mt-20 md:mt-0">
        <Button label="Add Assignment" type="submit" />
      </div>
    </form>
  );
};

export default AddAssignment;
