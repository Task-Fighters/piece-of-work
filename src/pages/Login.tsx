<<<<<<< HEAD
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AppContext } from '../AppContext';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { loginReducer } from '../slices/userSlice';
import { ContextType } from '../types';
=======
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
// import { ContextType } from '../types';
// import { AppContext } from '../AppContext';
>>>>>>> 5374dde3bdfba8bec4f2e7a0c91ec262b9a7bc1c
import Title from '../components/Title';
import { Button } from '../components/Button';
import lightLogo from '../assets/Saltblack.svg';

const Login = () => {
<<<<<<< HEAD
  const { user, setUser, profile, setProfile } = useContext(
    AppContext
  ) as ContextType;
  const [userGoogleToken, setUserGoogleToken] = useState<{
    access_token?: string;
  }>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
=======
  // const { user, setUser } = useContext(AppContext) as ContextType;
  const [userToken, setUserToken] = useState();
  const [profile, setProfile] = useState<IProfile>({} as IProfile);

>>>>>>> 5374dde3bdfba8bec4f2e7a0c91ec262b9a7bc1c
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUserGoogleToken(codeResponse)
  });

  useEffect(() => {
    if (userGoogleToken) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userGoogleToken.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${userGoogleToken.access_token}`,
              Accept: 'application/json'
            }
          }
        )
        .then((res) => {
          setProfile(res.data);
          setIsLoggedIn(true);
        });
    }
  }, [setProfile, userGoogleToken]);

  useEffect(() => {
    if (profile && isLoggedIn) {
      axios
        .put('https://project-salty-backend.azurewebsites.net/Users/login', {
          googleId: profile.id,
          email: profile.email,
          fullName: profile.name,
          imageUrl: profile.picture
        })
<<<<<<< HEAD
        .then((res) => {
          setUser(res.data);
          Cookies.set('userId', res.data.id, {
            expires: 30
          });
          Cookies.set('token', res.data.token, {
            expires: 30
          });
          navigate('/home', { state: { id: res.data.id } });
        })
=======
        // .then(() => {
        //   axios.put(
        //     'https://project-salty-backend.azurewebsites.net/Users/login',
        //     {
        //       email: profile.email,
        //       fullName: profile.name,
        //       imageURL: profile.picture,
        //       googleId: profile.googleId
        //     }
        //   );
        // })
        // .then((res) => console.log(res))
>>>>>>> 5374dde3bdfba8bec4f2e7a0c91ec262b9a7bc1c
        .catch((err) => console.log(err));
    }
  }, [profile]);

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
        <Button
          onClick={() => login()}
          label="Login with Google"
          type="button"
        />
      </div>
    </div>
  );
};

export default Login;

// https://project-salty-backend.azurewebsites.net/Users
