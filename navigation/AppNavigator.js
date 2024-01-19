// navigation/AppNavigator.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthContext from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

import AdminScreen from '../screens/AdminScreen';
import TeamsAndTasksScreen from '../screens/TeamsAndTasksScreen';
import TeamDetailScreen from '../screens/TeamDetailScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? (isAdmin ? 'Admin' : 'Home') : 'Login'}>
        <Stack.Screen name="Login"  component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="TeamsAndTasks" component={TeamsAndTasksScreen} />
        <Stack.Screen name="TeamDetail" component={TeamDetailScreen} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
