// screens/AdminScreen.js
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import AuthContext from '../context/AuthContext';

const AdminScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View>
      <Text>Admin Screen</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default AdminScreen;
