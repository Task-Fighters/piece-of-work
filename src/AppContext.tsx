import { createContext, useEffect, useState } from 'react';
// import axios from 'axios';
import { IUser, IAssignment, ContextType } from './types';

const AppContext = createContext<ContextType | null>(null);

const AppProvider = ({ children }: any) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [assignments, setAssignments] = useState<IAssignment[]>([]);

  useEffect(() => {
    // axios.get('http://localhost:8080/api/user').then((response) => {
    //   setUser([...response.data]);
    // });
    setUser({
      id: 0,
      googleId: '330983098',
      email: 'lucas.wiersma@appliedtechnology.se',
      fullName: 'Lucas Wiersma',
      role: 'user',
      location: 'Amsterdam',
      imageURL: '',
      status: 'active',
      groups: [1]
    });
  }, []);

  useEffect(() => {
    // axios.get('http://localhost:8080/api/assignments').then((response) => {
    //   setAssignments([...response.data]);
    // });
    setAssignments([
      {
        id: 22,
        title: 'Flight Finder v2 - Week 1',
        startDate: '12-03-2023',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas exercitationem assumenda amet necessitatibus, repellendus tenetur! Officia rem dolorem saepe laborum quo. Officiis quidem impedit corporis facilis ad saepe odit cumque!'
      },
      {
        id: 24,
        title: 'Flight Finder v2 - Week 2',
        startDate: '12-03-2023',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas exercitationem assumenda amet necessitatibus, repellendus tenetur! Officia rem dolorem saepe laborum quo. Officiis quidem impedit corporis facilis ad saepe odit cumque!'
      },
      {
        id: 26,
        title: 'Flight Finder v2 - Week 3',
        startDate: '12-03-2023',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas exercitationem assumenda amet necessitatibus, repellendus tenetur! Officia rem dolorem saepe laborum quo. Officiis quidem impedit corporis facilis ad saepe odit cumque!'
      },
      {
        id: 28,
        title: 'Flight Finder v2 - Week 4',
        startDate: '12-03-2023',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas exercitationem assumenda amet necessitatibus, repellendus tenetur! Officia rem dolorem saepe laborum quo. Officiis quidem impedit corporis facilis ad saepe odit cumque!'
      }
    ]);
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, assignments }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
