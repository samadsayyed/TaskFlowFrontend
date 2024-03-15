// screens/TaskDetailScreen.js
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ToastAndroid, Pressable } from "react-native";
import axios from "axios";
import Icon3 from "react-native-vector-icons/Ionicons";
import AuthContext from "../context/AuthContext";

const TaskDetailScreen = ({ route }) => {
  const { taskId } = route.params;
  const { login, admin, setUser, user, setAdmin, setAuthenticated } =
    useContext(AuthContext);
    const [refresh,setRefresh] = useState(true)
  const [taskDetails, setTaskDetails] = useState();
  const [loading, setLoading] = useState(false);

 
  const simplifyDeadline = (deadline) => {
    const date = new Date(deadline);
    return `${date.toDateString()} ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };
  const fetchTaskDetails = async () => {
    try {
      // Fetch task details from your backend API based on taskId
      const response = await axios.get(
        `https://taskflow-0pva.onrender.com/api/tasks/${taskId}`
      );
      setTaskDetails(response.data);
      // setRefresh((prev)=>!prev)
    } catch (error) {
      console.error("Error fetching task details:", error);
      // setRefresh((prev)=>!prev)
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, [refresh]);
  
  const updateTask = async () => {
    ToastAndroid.show("Updating task...", ToastAndroid.SHORT);
    setLoading(true);
    try {
      const response = await axios.put(
        `https://taskflow-0pva.onrender.com/api/tasks/${taskId}`
      );
      ToastAndroid.show("Task updated", ToastAndroid.SHORT);
      setRefresh((prev)=>!prev)
      // setLoading(false);
    } catch (error) {
      ToastAndroid.show("Some error occoured...", ToastAndroid.SHORT);
      setLoading(false);
      setRefresh((prev)=>!prev)
    }
  };
  const assignedUser = user?.username === taskDetails?.assignedTo?.username;
  return (
    <View style={styles.container}>
      {taskDetails?(<>
      <Text style={styles.title}>{taskDetails?.title}</Text>
      <View style={styles.box}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.description}>{taskDetails?.description}</Text>
        <Text style={styles.label}>Deadline:</Text>
        <Text style={styles.deadline}>
          {simplifyDeadline(taskDetails?.deadline)}
        </Text>
        <Text style={styles.label}>Priority:</Text>
        <Text>{taskDetails?.priority}</Text>
        <Text style={styles.label}>Assigned To:</Text>
        <Text>{taskDetails?.assignedTo?.username}</Text>
        <Text style={styles.label}>Assigned Team:</Text>
        <Text>{taskDetails?.assignedTeam?.name}</Text>
        <Text style={styles.label}>Completed:</Text>
        <Text>
          {taskDetails?.completed == true ? "Completed" : "Not Completed"}
        </Text>
      </View>
      {assignedUser && (
        <Pressable
          disabled={loading}
          style={styles.button}
          onPress={updateTask}
        >
          <Text style={styles.text}>Update Task</Text>
        </Pressable>
      )}</>):<Text>Loading</Text> }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    marginBottom: 10,
  },
  deadline: {
    marginBottom: 10,
    fontStyle: "italic",
  },
  box: {
    backgroundColor: "#d5b9eb",
    padding: 20,
    borderRadius: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "purple",
    width: "95%",
    alignSelf: "center",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default TaskDetailScreen;
