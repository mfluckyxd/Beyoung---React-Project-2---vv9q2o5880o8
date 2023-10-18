// useAuth.js
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loginStatus, setLoginStatus] = useState(() => {
    // Initialize loginStatus based on session storage or any other logic.
    return sessionStorage.getItem('loginStatus') === 'true';
  });

  // Listen for changes in session storage and update loginStatus accordingly.
  useEffect(() => {
    const handleStorageChange = () => {
      console.log('Session storage changed');
      const newLoginStatus = sessionStorage.getItem('loginStatus') === 'true';
      setLoginStatus(newLoginStatus);
    };

    window.addEventListener('storage', handleStorageChange);
    window.onstorage = () => {
      // When local storage changes, dump the list to
      // the console.
      console.log('its random stuff ffffffff');
    };

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={loginStatus}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
