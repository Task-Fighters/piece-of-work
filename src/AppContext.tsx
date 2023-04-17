import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { IUser, ContextType } from './types';

const AppContext = createContext<ContextType | null>(null);

const AppProvider = ({ children }: any) => {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    axios.get('http://localhost:8080/api/user').then((response) => {
      setUser([...response.data]);
    });
  }, []);

  return (
    <AppContext.Provider value={{ userRole }}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppProvider };
