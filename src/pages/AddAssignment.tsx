import React, { useContext, useState } from 'react';
import { ContextType } from '../types';
import Title from '../components/Title';
import { Input } from '../components/Input';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { AppContext } from '../AppContext';
import { useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import Datepicker from '../components/Datepicker';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

interface INewAssignment {
  title: string;
  startDate: string | null;
  description: string;
  groupId: null | string;
}

const AddAssignment = () => {
  const { user, groups } = useContext(AppContext) as ContextType;
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    startDate: '',
    description: '',
    groupId: null
  } as INewAssignment);

  let location = useLocation().pathname.toLowerCase();

  const handleSubmit = () => {
    // e.preventDefault();
    console.log(newAssignment);
    axios
      .post(`https://project-salty-backend.azurewebsites.net/Assignments`, {
        ...newAssignment
      })
      .then((response) => {
        console.log(response.statusText);
      });
    setNewAssignment({
      title: '',
      startDate: '',
      description: '',
      groupId: null
    });
    // setNewAssignment({
    //   title: '',
    //   startDate: '',
    //   description: '',
    //   groupId: null
    // });
  };

  return (
    <div className="container-xl">
      <Header role={user.role} location={location} />
      <div className="flex justify-center">
        <div className="max-w-6xl mx-2 w-full">
          <form>
            <Title underline title="Add New Assignment" />
            <Input
              label="Title"
              onChange={(e) =>
                setNewAssignment({
                  ...newAssignment,
                  title: e.target.value
                })
              }
              value={newAssignment.title}
            />
            <Datepicker
              value={newAssignment.startDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewAssignment({
                  ...newAssignment,
                  startDate: e.target.value
                })
              }
            />
            <Input
              options={groups}
              select
              label="Group"
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, groupId: e.target.value })
              }
            />
            <label className="text-pink-600 text-lg font-bold font-sans">
              Details
            </label>
            <ReactQuill
              className="h-44 mb-14"
              theme="snow"
              value={newAssignment.description}
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, description: e })
              }
            />
            <div className="mb-32 mt-20 md:mt-0">
              <Button label="Add Assignment" onClick={handleSubmit} />
            </div>
          </form>
        </div>
        <Footer role={user.role} image={user.imageUrl} />
      </div>
    </div>
  );
};

export default AddAssignment;
