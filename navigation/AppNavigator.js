// navigation/AppNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import AuthContext from '../context/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import NewTaskForm from '../screens/NewTaskForm';
import NewTeamForm from '../screens/NewTeam';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import TeamDetailScreen from '../screens/TeamDetailScreen';
import TeamsAndTasksScreen from '../screens/TeamsAndTasksScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated,setIsAuthenticated, isAdmin,user } = useContext(AuthContext);
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'home' : 'Login'}>
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
