import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { IUser, IAssignment, ContextType, IGroup } from './types';

const AppContext = createContext<ContextType | null>(null);

const AppProvider = ({ children }: any) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [userGroup, setUserGroup] = useState<IGroup[]>([]);
  const [userAssignments, setUserAssignments] = useState<IAssignment[]>();
  const [assignments, setAssignments] = useState<IAssignment[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);

  useEffect(() => {
    // axios.get('http://localhost:8080/api/user').then((response) => {
    //   setUser([...response.data]);
    // });
    setUser({
      id: 0,
      googleId: '330983098',
      email: 'lucas.wiersma@appliedtechnology.se',
      fullName: 'Lucas Wiersma',
      role: 'admin',
      location: 'Amsterdam',
      imageURL: '',
      status: 'active',
      groups: [{ groupsId: 1, name: 'JSFS Fall 2022' }]
    });
  }, []);

  useEffect(() => {
    axios
      .get('https://project-salty-backend.azurewebsites.net/Users')
      .then((response) => {
        setUsers([...response.data]);
      });
  }, []);

  useEffect(() => {
    axios
      .get('https://project-salty-backend.azurewebsites.net/Groups')
      .then((response) => {
        setGroups([...response.data]);
      });
  }, []);

  useEffect(() => {
    // axios
    //   .get('https://project-salty-backend.azurewebsites.net/Assignments/group/')
    //   .then((response) => {
    //     console.log('RESPONSE', response);
    //     setAssignments([...response.data]);
    //   });
    setAssignments([
      {
        id: 22,
        title: 'Flight Finder v2 - Week 1',
        startDate: '12-03-2023',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas exercitationem assumenda amet necessitatibus, repellendus tenetur! Officia rem dolorem saepe laborum quo. Officiis quidem impedit corporis facilis ad saepe odit cumque!',
        submission: [
          {
            userId: 1,
            name: 'Dasha Mylnikova',
            repo: 'https://github.com/saltams/project-salty'
          },
          {
            userId: 2,
            name: 'Teddy Bear',
            repo: 'https://github.com/saltams/project-salty'
          },
          {
            userId: 3,
            name: 'Winny Pooh',
            repo: 'https://github.com/saltams/project-salty'
          }
        ]
      },
      {
        id: 24,
        title: 'Flight Finder v2 - Week 2',
        startDate: '12-03-2023',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas exercitationem assumenda amet necessitatibus, repellendus tenetur! Officia rem dolorem saepe laborum quo. Officiis quidem impedit corporis facilis ad saepe odit cumque!',
        submission: [
          {
            userId: 1,
            name: 'Dasha Mylnikova',
            repo: 'https://github.com/saltams/project-salty'
          },
          {
            userId: 2,
            name: 'Teddy Bear',
            repo: 'https://github.com/saltams/project-salty'
          },
          {
            userId: 3,
            name: 'Winny Pooh',
            repo: 'https://github.com/saltams/project-salty'
          }
        ]
      },
      {
        id: 26,
        title: 'Flight Finder v2 - Week 3',
        startDate: '12-03-2023',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas exercitationem assumenda amet necessitatibus, repellendus tenetur! Officia rem dolorem saepe laborum quo. Officiis quidem impedit corporis facilis ad saepe odit cumque!',
        submission: [
          {
            userId: 0,
            name: 'Lucas Wiersma',
            repo: 'https://github.com/saltams/project-salty'
          },
          {
            userId: 2,
            name: 'Teddy Bear',
            repo: 'https://github.com/saltams/project-salty'
          },
          {
            userId: 3,
            name: 'Winny Pooh',
            repo: 'https://github.com/saltams/project-salty'
          }
        ]
      },
      {
        id: 28,
        title: 'Flight Finder v2 - Week 4',
        startDate: '12-03-2023',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas exercitationem assumenda amet necessitatibus, repellendus tenetur! Officia rem dolorem saepe laborum quo. Officiis quidem impedit corporis facilis ad saepe odit cumque!',
        submission: [
          {
            userId: 1,
            name: 'Dasha Mylnikova',
            repo: 'https://github.com/saltams/project-salty'
          },
          {
            userId: 3,
            name: 'Teddy Bear',
            repo: 'https://github.com/saltams/project-salty'
          },
          {
            userId: 4,
            name: 'Winny Pooh',
            repo: 'https://github.com/saltams/project-salty'
          }
        ]
      }
    ]);
  }, []);

  return (
    <AppContext.Provider value={{ groups, user, setUser, assignments, users }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
