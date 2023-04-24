import React, { useContext } from 'react';
import { ContextType } from '../types';
import Title from '../components/Title';
import { Input } from '../components/Input';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { AppContext } from '../AppContext';
import { useLocation } from 'react-router-dom';
import { Button } from '../components/Button';

const AddAssignment = () => {
  const { user, groups } = useContext(AppContext) as ContextType;

  let location = useLocation().pathname.toLowerCase();

  return (
    <div className="container-xl">
      <Header role={user.role} location={location} />
      <div className="flex justify-center">
        <div className="max-w-6xl mx-2">
          <form>
            <Title underline title="Add New Assignment" />
            <Input label="Title" />
            <Input label="Date" />
            <Input options={groups} select label="Group" />
            <Input label="Details" />
            <Button label="Add Assignment" />
          </form>
        </div>
        <Footer role={user.role} image={user.imageURL} />
      </div>
    </div>
  );
};

export default AddAssignment;
