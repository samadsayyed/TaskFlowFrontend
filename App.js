// App.js
import React, { useState, useMemo, useEffect } from "react";
import AppNavigator from "./navigation/AppNavigator";
import AuthContext from "./context/AuthContext";
import { ToastAndroid } from "react-native";
import Toast from 'react-native-toast-message';
import Navbar from "./components/Navbar";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [user,setUser] = useState("")



  const authContextValue ={
    setAuthenticated,
    setUser,
    setAdmin,
    authenticated,
      user,
      admin
    }

  return (
    <AuthContext.Provider value={authContextValue}>
      <AppNavigator />
    </AuthContext.Provider>
  );
};

export default App;
