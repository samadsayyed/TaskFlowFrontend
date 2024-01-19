// screens/TeamsAndTasksScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet,TouchableOpacity } from 'react-native';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const TeamsAndTasksScreen = ({navigation}) => {
  const { isAdmin } = useContext(AuthContext);
  const [teams, setTeams] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTeamsAndTasks();
  }, []);

  const fetchTeamsAndTasks = async () => {
    try {
      // Fetch teams from your backend API
      const teamsResponse = await axios.get('https://taskflow-0pva.onrender.com/api/teams');
      setTeams(teamsResponse.data);

      // Fetch tasks from your backend API
      const tasksResponse = await axios.get('https://taskflow-0pva.onrender.com/api/tasks');
      setTasks(tasksResponse.data);
    } catch (error) {
      console.error('Error fetching teams and tasks:', error);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      // Delete team using your backend API
      await axios.delete(`your-backend-api-url/teams/${teamId}`);
      fetchTeamsAndTasks(); // Refresh teams and tasks after deletion
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      // Delete task using your backend API
      await axios.delete(`your-backend-api-url/tasks/${taskId}`);
      fetchTeamsAndTasks(); // Refresh teams and tasks after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  const navigateToTeamDetail = (teamId) => {
    // Navigate to the TeamDetail screen with the selected teamId
    navigation.navigate('TeamDetail', { teamId });
  };

  const navigateToTaskDetail = (taskId) => {
    // Navigate to the TaskDetail screen with the selected taskId
    navigation.navigate('TaskDetail', { taskId });
  };
  return (
    <View style={styles.container}>
      {/* ... existing code */}

      <Text style={styles.sectionHeader}>Teams</Text>
      <FlatList
        data={teams}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToTeamDetail(item._id)}>
            <View style={styles.item}>
              <Text>{item.name}</Text>
              {isAdmin && (
                <Button title="Delete" onPress={() => handleDeleteTeam(item._id)} />
              )}
            </View>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionHeader}>Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToTaskDetail(item._id)}>
            <View style={styles.item}>
              <Text>{item.title}</Text>
              {isAdmin && (
                <Button title="Delete" onPress={() => handleDeleteTask(item._id)} />
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  adminControls: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default TeamsAndTasksScreen;
