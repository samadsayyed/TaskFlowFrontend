// App.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import AppNavigator from "./navigation/AppNavigator";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState();


  useEffect(() => {
    const fetchUser = async()=>{
      try {
        const {data} = await axios.get("https://taskflow-0pva.onrender.com/api/profile")
        console.log(data,"data");
        const {user} = data;
        setUser(user)
        if (user.role == "admin") {
          setAdmin(true);
        }
      } catch (error) {
        
      }
    }
    fetchUser()
    console.log(user);
  }, [])
  

  const authContextValue = {
    setAuthenticated,
    setUser,
    setAdmin,
    authenticated,
    user,
    admin
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <AppNavigator />
    </AuthContext.Provider>
  );
};

export default App;
