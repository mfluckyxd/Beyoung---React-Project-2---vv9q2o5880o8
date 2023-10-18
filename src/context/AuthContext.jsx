import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loginStatus, setLoginStatus] = useState(() => {
    const storedLoginStatus = localStorage.getItem('loginStatus');
    return storedLoginStatus === 'true';
  });

  const updateLoginStatus = (newStatus) => {
    setLoginStatus(newStatus);
    localStorage.setItem('loginStatus', newStatus);
  };

  return (
    <AuthContext.Provider value={{ loginStatus, updateLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context.loginStatus;
}

export function useUpdateLoginStatus() {
  const context = useContext(AuthContext);
  return context.updateLoginStatus;
}
