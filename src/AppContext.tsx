import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { IUser, IAssignment, IProfile, ContextType, IGroup } from './types';
import Cookies from 'js-cookie';
import secureLocalStorage from 'react-secure-storage';

const AppContext = createContext<ContextType | null>(null);

const AppProvider = ({ children }: any) => {
  const cookieToken: string | undefined = Cookies.get('token');
  const cookieUserId: string | undefined = Cookies.get('userId');
  const [user, setUser] = useState<IUser>({} as IUser);
  const [profile, setProfile] = useState<IProfile>({} as IProfile);
  // const [userGroup, setUserGroup] = useState<IGroup[]>([]);
  // const [userAssignments, setUserAssignments] = useState<IAssignment[]>();
  const [assignments, setAssignments] = useState<IAssignment[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [update, setUpdate] = useState<Boolean>(false);
  let localUserId = secureLocalStorage.getItem('id');

  useEffect(() => {
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
      });
  }, [cookieToken, cookieUserId]);

  useEffect(() => {
    axios
      .get('https://project-salty-backend.azurewebsites.net/Users', {
        headers: {
          Authorization: `Bearer ${cookieToken}`,
          Accept: 'text/plain'
        }
      })
      .then((response) => {
        setUsers([...response.data]);
      });
  }, [cookieToken]);

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
      user?.groups?.forEach((group) => {
        axios
          .get(
            `https://project-salty-backend.azurewebsites.net/Assignments/group/${group.groupsId}`,
            {
              headers: {
                Authorization: `Bearer ${cookieToken}`,
                Accept: 'text/plain'
              }
            }
          )
          .then((response) => {
            setAssignments([...response.data]);
          });
      });
    }
  }, [user, cookieToken]);

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
