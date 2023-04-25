import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { ContextType } from '../types';
import Title from '../components/Title';
import { Input } from '../components/Input';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import Datepicker from '../components/Datepicker';
import RichTextEditor from '../components/RichTextEditor';

const UpdateAssignment = () => {
  const { user, groups } = useContext(AppContext) as ContextType;

  let location = useLocation().pathname.toLowerCase();

  return (
    <div className="container-xl">
      <Header role={user.role} location={location} />
      <div className="flex justify-center">
        <div className="max-w-6xl mx-2 w-full">
          <form>
            <Title underline title="Update Assignment" />
            <Input label="Title" />
            <Datepicker />
            <Input options={groups} select label="Group" />
            <RichTextEditor />
            <div>
              <Button label="Update Assignment" />
            </div>
            <div className="mb-32">
              <Button buttonColor="pink" label="Delete Assignment" />
            </div>
          </form>
        </div>
        <Footer role={user.role} image={user.imageURL} />
      </div>
    </div>
  );
};

export default UpdateAssignment;
