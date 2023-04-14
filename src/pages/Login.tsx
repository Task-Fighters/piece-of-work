import React from 'react';
import lightLogo from '../assets/Saltblack.svg';
import Title from '../components/Title';
import { Button } from '../components/Button';

const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center mx-2">
      <div className="max-w-md w-full">
        <img
          className="mb-16 px-5"
          alt="Light theme Salt logo"
          src={lightLogo}
        />
        <Title underline title="Welcome" />
        <p className="mb-10 text-sm">
          Log in with your @appliedtechnology.se account
        </p>
        <Button label="Login with Google" />
      </div>
    </div>
  );
};

export default Login;
