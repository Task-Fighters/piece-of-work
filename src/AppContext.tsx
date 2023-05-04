import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { IUser, IAssignment, IProfile, ContextType, IGroup } from './types';
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

const AppContext = createContext<ContextType | null>(null);

const AppProvider = ({ children }: any) => {
  const cookie: string | undefined = Cookies.get('token');
  const location = useLocation();
  const userData = location.state;
  const [userId, setUserId] = useState<number>();
  const [user, setUser] = useState<IUser>({} as IUser);
  const [profile, setProfile] = useState<IProfile>({} as IProfile);
  // const [userGroup, setUserGroup] = useState<IGroup[]>([]);
  // const [userAssignments, setUserAssignments] = useState<IAssignment[]>();
  const [assignments, setAssignments] = useState<IAssignment[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [update, setUpdate] = useState<Boolean>(false);

  useEffect(() => {
      const userCookie: string | undefined = Cookies.get('user');
      if (userCookie) {
          setUser(JSON.parse(userCookie));
        }
      }, []);
  
  // useEffect(() => {
  //   if (userData) {
  //     setUserId(userData.id);
  //   axios
  //   .get(`https://project-salty-backend.azurewebsites.net/Users/${userId}`, {
  //     headers:{
  //       Authorization: `Bearer ${cookie}`,
  //       Accept: 'text/plain'
  //     }
  //   })
  //   .then((response) => {
  //     console.log('before',user)
  //     setUser({...response.data});
  //     console.log('after',user)
  //   });
  //   }
  // }, [])
      
  useEffect(() => {
    axios
      .get('https://project-salty-backend.azurewebsites.net/Users', {
        headers:{
          Authorization: `Bearer ${cookie}`,
          Accept: 'text/plain'
        }
      })
      .then((response) => {
        setUsers([...response.data]);
      });
  }, [cookie]);

  useEffect(() => {
    axios
      .get('https://project-salty-backend.azurewebsites.net/Groups',
      {
        headers: {
          Authorization: `Bearer ${cookie}`,
          Accept: 'text/plain'
        }
      })
      .then((response) => {
        setGroups([...response.data]);
        setUpdate(false);
      });
  }, [cookie]);

  useEffect(() => {
    if (user.role === 'admin') {
      axios
        .get('https://project-salty-backend.azurewebsites.net/Assignments', {
          headers:{
            Authorization: `Bearer ${cookie}`,
            Accept: 'text/plain'
          }
        })
        .then((response) => {
          setAssignments([...response.data]);
        });
    } else {
      user?.groups?.forEach((group) => {
        axios
          .get(
            `https://project-salty-backend.azurewebsites.net/Assignments/group/${group.groupsId}`, {
              headers:{
                Authorization: `Bearer ${cookie}`,
                Accept: 'text/plain'
              }
            }
          )
          .then((response) => {
            setAssignments([...response.data]);
          });
      });
    }
  }, [user, cookie]);

  return (
    <AppContext.Provider
      value={{
        groups,
        user,
        userId,
        setUserId,
        profile,
        setUser,
        setProfile,
        assignments,
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
