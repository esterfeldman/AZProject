import React, { useState, createContext, useContext, useEffect } from 'react';
import { getUserFromLocalStorage } from '../utils/localStorageUtils';

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const path = "https://proj.ruppin.ac.il/cgroup95/prod/api/";
  
  function signinUser(user) {
    setUser(user);
  }

  return (
    <UserContext.Provider value={{ user, setUser, signinUser, 
    path }}> 
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
