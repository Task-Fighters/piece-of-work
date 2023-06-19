import { useEffect, useContext } from 'react';
import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import axios from 'axios';
import { AppContext } from '../AppContext';
import { ContextType } from '../types';
import Title from '../components/Title';
import { Button } from '../components/Button';
import lightLogo from '../assets/Saltblack.svg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setProfile, userGoogleToken, setUserGoogleToken } = useContext(
    AppContext
  ) as ContextType;

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUserGoogleToken(codeResponse);
    },
    onError: (error) => {
      console.log(error, 'Login Failed');
  }
  }
  );

  const navigate = useNavigate();
  
  useEffect(() => {
    if (userGoogleToken) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userGoogleToken.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${userGoogleToken.access_token}`,
              Accept: 'application/json'            }
          }
        )
        .then((res) => {
          setProfile(res.data);
          console.log(res.data);
        }).catch((error) => { 
          console.log(error);
        });
    }
    // eslint-disable-next-line
  }, [setProfile, userGoogleToken]);

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
