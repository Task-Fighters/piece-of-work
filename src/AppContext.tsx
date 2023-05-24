import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { IUser, IAssignment, IProfile, ContextType, IGroup } from './types';
import Cookies from 'js-cookie';
import secureLocalStorage from 'react-secure-storage';
import jwtDecode from 'jwt-decode';

const AppContext = createContext<ContextType | null>(null);

interface DecodedToken {
  exp: number;
}

const AppProvider = ({ children }: any) => {
  const cookieToken: string | undefined = Cookies.get('token');
  const cookieUserId: string | undefined = Cookies.get('userId');
  const [user, setUser] = useState<IUser>({} as IUser);
  const [profile, setProfile] = useState<IProfile>({} as IProfile);
  const [assignments, setAssignments] = useState<IAssignment[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [update, setUpdate] = useState<Boolean>(false);
  let localUserId = secureLocalStorage.getItem('id');

  useEffect(() => {
    if (localUserId !== null) {
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
  }, [cookieToken, cookieUserId, localUserId]);

  useEffect(() => {
    if (localUserId !== null) {
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
  }, [cookieToken, localUserId]);

  useEffect(() => {
    if (cookieToken) {
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
  }, [cookieToken, update]);

  useEffect(() => {
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
      const userAssignments: any[]= [];
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
            userAssignments.push(...response.data)
            
          });
      });
      setAssignments(userAssignments);
    }
  }, [user, cookieToken]);

  // useEffect(() => {
  //   axios
  //       .get('https://project-salty-backend.azurewebsites.net/Assignments', {
  //         headers: {
  //           Authorization: `Bearer ${cookieToken}`,
  //           Accept: 'text/plain'
  //         }
  //       })
  //       .then((response) => {
  //         setAssignments([...response.data]);
  //       });
  // }, [user, cookieToken]);

  // useEffect(() => {
  //   if(user && user?.role !== "admin") {
  //     user.groupsId?.forEach(group => {
  //             axios
  //               .get(
  //                 `https://project-salty-backend.azurewebsites.net/Assignments/group/${group}`,
  //                 {
  //                   headers: {
  //                     Authorization: `Bearer ${cookieToken}`,
  //                     Accept: 'text/plain'
  //                   }
  //                 }
  //               )
  //               .then((response) => {
  //                 console.log(response.data, "mary");
  //                 setUserAssignments([...userAssignments, response.data]);
  //               });
  //   });
  //  }}, [user, cookieToken, setUserAssignments]);

  // console.log(user, "user app context")
  // console.log(userAssignments, "user ass  app context")


  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const expiry = jwtDecode(token) as DecodedToken;
      const exp = expiry.exp;
      if (exp) {
        const expirationTime = Number(exp) * 1000 - 60000;
        const currentTime = Date.now();
        if (expirationTime < currentTime) {
          refreshToken();
        }
      }
    }
  }, []);

  const refreshToken = async () => {
    const userId = secureLocalStorage.getItem('id');
    const refreshToken = secureLocalStorage.getItem('refreshToken');
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
      if (newAccessToken) {
        Cookies.set('token', newAccessToken);
        secureLocalStorage.setItem('refreshToken', newAccessToken);
      } else {
        secureLocalStorage.removeItem('id');
        secureLocalStorage.removeItem('role');
        secureLocalStorage.removeItem('refreshToken');
        Cookies.remove('token');
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        users
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
