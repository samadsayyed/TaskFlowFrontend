// App.js
import React, { useState, useMemo } from 'react';
import AppNavigator from './navigation/AppNavigator';
import AuthContext from './context/AuthContext';


const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);

  const login = () => {
    setAuthenticated(true);
    setAdmin(false); // Set to true for admin access
  };

  const logout = () => {
    setAuthenticated(false);
    setAdmin(false);
  };

  const authContextValue = useMemo(() => {
    return {
      isAuthenticated: authenticated,
      isAdmin: admin,
      login,
      logout,
    };
  }, [authenticated, admin]);

  return (
    <AuthContext.Provider value={authContextValue}>
      <AppNavigator />
    </AuthContext.Provider>
  );
};

export default App;
