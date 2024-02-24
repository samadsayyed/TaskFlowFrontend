// navigation/AppNavigator.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthContext from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import TeamsAndTasksScreen from '../screens/TeamsAndTasksScreen';
import TeamDetailScreen from '../screens/TeamDetailScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Navbar from '../components/Navbar';
import ProfileScreen from '../screens/ProfileScreen';
import NewTeamForm from '../screens/NewTeam';
import NewTaskForm from '../screens/NewTaskForm';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? (isAdmin ? 'Admin' : 'Home') : 'Login'}>
        <Stack.Screen name="Login"  component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TeamsAndTasks" component={TeamsAndTasksScreen} />
        <Stack.Screen name="TeamDetail" component={TeamDetailScreen} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} /> 
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="NewTeam" component={NewTeamForm} />
        <Stack.Screen name="NewTask" component={NewTaskForm} />
      </Stack.Navigator>
      <Navbar/>
    </NavigationContainer>
  );
};

export default AppNavigator;
