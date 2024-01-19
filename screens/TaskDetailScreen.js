// screens/TaskDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const TaskDetailScreen = ({ route }) => {
  const { taskId } = route.params;
  const [taskDetails, setTaskDetails] = useState(null);

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  const fetchTaskDetails = async () => {
    try {
      // Fetch task details from your backend API based on taskId
      const response = await axios.get(`https://taskflow-0pva.onrender.com/api/tasks/${taskId}`);
      setTaskDetails(response.data);
    } catch (error) {
      console.error('Error fetching task details:', error);
    }
  };

  return (
    <View style={styles.container}>
      {taskDetails ? (
        <>
          <Text style={styles.header}>{taskDetails.title}</Text>
          <Text>{JSON.stringify(taskDetails)}</Text>
          {/* Display other task details here */}
        </>
      ) : (
        <Text>Loading task details...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default TaskDetailScreen;
