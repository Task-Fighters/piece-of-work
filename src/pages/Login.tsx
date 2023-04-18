import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
// import { ContextType } from '../types';
// import { AppContext } from '../AppContext';
import Title from '../components/Title';
import { Button } from '../components/Button';
import { IProfile } from '../types';
import lightLogo from '../assets/Saltblack.svg';

const Login = () => {
  // const { user, setUser } = useContext(AppContext) as ContextType;
  const [userToken, setUserToken] = useState();
  const [profile, setProfile] = useState<IProfile>({} as IProfile);

  const login = useGoogleLogin({
    //@ts-ignore
    onSuccess: (codeResponse) => setUserToken(codeResponse)
  });

  useEffect(() => {
    if (userToken) {
      axios
        .get(
          //@ts-ignore
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userToken.access_token}`,
          {
            headers: {
              //@ts-ignore
              Authorization: `Bearer ${userToken.access_token}`,
              Accept: 'application/json'
            }
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
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
        .catch((err) => console.log(err));
    }
  }, [userToken]);

  console.log('PROFILE', profile);
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
        <Button onClick={() => login()} label="Login with Google" />
      </div>
    </div>
  );
};

export default Login;

// https://project-salty-backend.azurewebsites.net/Users
