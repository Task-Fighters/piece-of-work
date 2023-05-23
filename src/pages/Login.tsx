import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AppContext } from '../AppContext';
import { ContextType } from '../types';
import Title from '../components/Title';
import { Button } from '../components/Button';
import lightLogo from '../assets/Saltblack.svg';

const Login = () => {
  const { setUser, profile, setProfile } = useContext(
    AppContext
  ) as ContextType;
  const [userGoogleToken, setUserGoogleToken] = useState<{
    access_token?: string;
  }>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
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
        .then((res) => {
          setUser(res.data);
          Cookies.set('token', res.data.token);
          secureLocalStorage.setItem('id', res.data.id);
          secureLocalStorage.setItem('role', res.data.role);
          navigate('/home');
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn, navigate, profile, setUser]);

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
