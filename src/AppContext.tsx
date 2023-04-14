import { createContext } from 'react';

export interface ContextData {}

const AppContext = createContext<ContextData | null>(null);

const AppProvider = ({ children }: any) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
