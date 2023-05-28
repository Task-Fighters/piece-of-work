import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import {
  IUser,
  IAssignment,
  IProfile,
  ContextType,
  IGroup,
  IResponse
} from './types';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import jwtDecode from 'jwt-decode';

const AppContext = createContext<ContextType | null>(null);

interface DecodedToken {
  exp: number;
}

const AppProvider = ({ children }: any) => {
  const cookieToken: string | undefined = Cookies.get('token');
  const [userGoogleToken, setUserGoogleToken] = useState<IResponse | undefined>(
    undefined
  );
  const [user, setUser] = useState<IUser>({} as IUser);
  const [profile, setProfile] = useState<IProfile>({} as IProfile);
  const [assignments, setAssignments] = useState<IAssignment[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [update, setUpdate] = useState<Boolean>(false);
  // eslint-disable-next-line
  const [refresh, setRefresh] = useState<Boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  let localUserId = secureLocalStorage.getItem('id');
  const navigate = useNavigate();

  useEffect(() => {
    if (userGoogleToken && profile.name !== undefined) {
      axios
        .put('https://project-salty-backend.azurewebsites.net/Users/login', {
          googleId: userGoogleToken.access_token,
          email: profile.email,
          fullName: profile.name,
          imageUrl: profile.picture
        })
        .then((res) => {
          setUser(res.data);
          Cookies.set('token', res.data.token);
          secureLocalStorage.setItem('id', res.data.id);
          secureLocalStorage.setItem('role', res.data.role);
          secureLocalStorage.setItem('refreshToken', res.data.refreshToken);
          setIsLoggedIn(true);
          navigate('/home');
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line
  }, [profile, userGoogleToken, update]);

  useEffect(() => {
    const token = Cookies.get('token');
    setRefresh(false);
    if (token) {
      const expiry = jwtDecode(token.toString()) as DecodedToken;
      const exp = expiry.exp;
      if (exp) {
        const expirationTime = Number(exp) * 1000 - 60000;
        const currentTime = Date.now();
        if (expirationTime < currentTime) {
          console.log('calling update token');
          updateToken();
        } else {
          setIsLoggedIn(true);
        }
      }
    } else {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [navigate, isLoggedIn, localUserId]);

  const updateToken = async () => {
    const userId = secureLocalStorage.getItem('id');
    const refreshToken = secureLocalStorage.getItem('refreshToken');
    if (refreshToken) {
      const expiry = jwtDecode(refreshToken.toString()) as DecodedToken;
      const exp = expiry.exp;
      if (exp) {
        try {
          const response = await axios.get(
            `https://project-salty-backend.azurewebsites.net/Users/refreshToken?id=${userId}`,
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
                Accept: 'text/plain'
              }
            }
          );
          const newAccessToken = response.data;
          secureLocalStorage.removeItem('refreshToken');
          Cookies.set('token', newAccessToken);
          secureLocalStorage.setItem('refreshToken', newAccessToken);
          setRefresh(true);
          setIsLoggedIn(true);
        } catch (error) {
          navigate('/');
          Cookies.remove('token');
          secureLocalStorage.clear();
        }
      }
    } else {
      navigate('/');
      Cookies.remove('token');
      secureLocalStorage.clear();
    }
  };

  useEffect(() => {
    if (isLoggedIn && localUserId !== null) {
      axios
        .get(
          `https://project-salty-backend.azurewebsites.net/Users/${localUserId}`,
          {
            headers: {
              Authorization: `Bearer ${cookieToken}`,
              Accept: 'text/plain'
            }
          }
        )
        .then((response) => {
          setUser({ ...response.data });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [cookieToken, localUserId, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && localUserId !== null) {
      axios
        .get('https://project-salty-backend.azurewebsites.net/Users', {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
            Accept: 'text/plain'
          }
        })
        .then((response) => {
          setUsers([...response.data]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [cookieToken, localUserId, user.role, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && cookieToken) {
      axios
        .get('https://project-salty-backend.azurewebsites.net/Groups', {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
            Accept: 'text/plain'
          }
        })
        .then((response) => {
          setGroups([...response.data]);
          setUpdate(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [cookieToken, update, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && cookieToken) {
      if (user.role === 'admin') {
        axios
          .get('https://project-salty-backend.azurewebsites.net/Assignments', {
            headers: {
              Authorization: `Bearer ${cookieToken}`,
              Accept: 'text/plain'
            }
          })
          .then((response) => {
            setAssignments([...response.data]);
          });
      } else {
        const userAssignments: any[] = [];
        user?.groupsId?.forEach((group) => {
          axios
            .get(
              `https://project-salty-backend.azurewebsites.net/Assignments/group/${group}`,
              {
                headers: {
                  Authorization: `Bearer ${cookieToken}`,
                  Accept: 'text/plain'
                }
              }
            )
            .then((response) => {
              userAssignments.push(...response.data);
            });
        });
        setAssignments(userAssignments);
      }
    }
  }, [user, cookieToken, isLoggedIn]);

  return (
    <AppContext.Provider
      value={{
        groups,
        user,
        profile,
        setUser,
        setUsers,
        setProfile,
        assignments,
        setAssignments,
        setGroups,
        setUpdate,
        users,
        userGoogleToken,
        setUserGoogleToken
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
