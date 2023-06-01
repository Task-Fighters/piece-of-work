import Title from '../components/Title';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center w-full items-center h-[60vh]">
      <Title title="Ooops!" className="!text-5xl text-pink-600" />
      <p className="text-3xl mt-6 text-gray-600 md:text-5xl">
        Something went wrong!
      </p>
      <Button
        buttonColor="pink"
        type="button"
        label="Go Home"
        className="mt-8 !w-36"
        onClick={(e: React.MouseEvent<HTMLElement>) => navigate('/home')}
      />
    </div>
  );
};

export default Error;
