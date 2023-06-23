import { useEffect, useContext } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { AppContext } from 'AppContext';
import { ContextType } from 'types';
import Title from 'components/Title';
import { Button } from 'components/Button';
import blackLogo from 'assets/Logo_black.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setProfile, userGoogleToken, setUserGoogleToken } = useContext(
    AppContext
  ) as ContextType;

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUserGoogleToken(codeResponse);
    }
  });

  const navigate = useNavigate();
  
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
        }).catch((error) => { 
          navigate("/error")
        });
    }
    // eslint-disable-next-line
  }, [setProfile, userGoogleToken]);

  return (
    <div className="h-screen flex justify-center items-center mx-2">
      <div className="max-w-md w-full">
        <img
          className="mb-16 px-5"
          alt="Logo"
          src={blackLogo}
        />
        <Title underline title="Welcome" className='text-pink-600'/>
        <p className="mb-8 text-sm">
          Get started! Log in with your Google account
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
