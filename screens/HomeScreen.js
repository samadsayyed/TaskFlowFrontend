// screens/HomeScreen.js
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import AuthContext from '../context/AuthContext';

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default HomeScreen;
