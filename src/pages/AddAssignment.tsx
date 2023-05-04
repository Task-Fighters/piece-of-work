import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import axios from 'axios';
import Cookies from 'js-cookie';
import { MultiSelect } from 'react-multi-select-component';
import { ContextType } from '../types';
import Title from '../components/Title';
import { Input } from '../components/Input';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { AppContext } from '../AppContext';
import { Button } from '../components/Button';
import Datepicker from '../components/Datepicker';
import 'react-quill/dist/quill.snow.css';

const AddAssignment = () => {
  const cookie: string | undefined = Cookies.get('token');
  const { user, groups } = useContext(AppContext) as ContextType;
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [description, setDescription] = useState('');

  let location = useLocation().pathname.toLowerCase();
  const selectOptions = groups.map(item => ({ label: item.name, value: item.id }));
  const [selectedGroups, setSelectedGroups] = useState(selectOptions);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const selectedGroupsIds = selectedGroups.map(group =>  group.value)
    // change after backend is fixed, pass whole array instead of first position
    const newAssignment = {
      title: title,
      startDate: startDate,
      description: description,
      groupId: selectedGroupsIds[0]
    };

    axios
      .post(`https://project-salty-backend.azurewebsites.net/Assignments`, {
        ...newAssignment
      }, {
        headers:{
          Authorization: `Bearer ${cookie}`,
          Accept: 'text/plain'
        }
      })
      .then((response) => {
        console.log(response.statusText);
      });
    const target = e.target as HTMLFormElement;
    target.reset();
    setTitle('');
    setStartDate('');
    setDescription('');
  };

  return (
    <div className="container-xl">
      <Header role={user.role} location={location} />
      <div className="flex justify-center">
        <div className="max-w-6xl mx-2 w-full">
          <form onSubmit={handleSubmit}>
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
            <label className='text-pink-600 text-lg font-bold font-sans'>Group</label>
            <div className='.dropdown-container'>
              <MultiSelect
                className='mb-4'
                options={selectOptions}
                value={selectedGroups}
                onChange={setSelectedGroups}
                labelledBy="Select"
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
        </div>
        <Footer role={user.role} image={user.imageUrl} />
      </div>
    </div>
  );
};

export default AddAssignment;
