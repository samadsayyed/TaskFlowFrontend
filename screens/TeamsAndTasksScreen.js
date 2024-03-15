// screens/TeamsAndTasksScreen.js
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Pressable,
} from "react-native";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import Delete from "react-native-vector-icons/Entypo";

const TeamsAndTasksScreen = ({ navigation }) => {
  const { user, admin } = useContext(AuthContext);
  const [teams, setTeams] = useState();
  const [tasks, setTasks] = useState();
  const [loading, setLoading] = useState();
  const isAdmin = user?.role === "admin";
  if (!user) {
    ToastAndroid.show("Login first task", ToastAndroid.SHORT);
    navigation.navigate("Login");
  }
  useEffect(() => {
    fetchTeamsAndTasks();
  },[]);
  const fetchTeamsAndTasks = async () => {
    setLoading(true);
    try {
      const [teamsResponse, tasksResponse] = await Promise.all([
        axios.get("https://taskflow-0pva.onrender.com/api/teams"),
        axios.get("https://taskflow-0pva.onrender.com/api/tasks"),
      ]);
      setTeams(teamsResponse.data);
      setTasks(tasksResponse.data);
      setLoading(false);
    } catch (error) {
      ToastAndroid.show("Cannot fetch teams and tasks", ToastAndroid.SHORT);
      setLoading(false);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    ToastAndroid.show("Trying to delete team", ToastAndroid.SHORT);
    try {
      const { data } = await axios.delete(
        `https://taskflow-0pva.onrender.com/api/teams/${teamId}`
      );
      ToastAndroid.show("deleted team", ToastAndroid.SHORT);
      console.log(data);

      // fetchTeamsAndTasks(); // Refresh teams and tasks after deletion
    } catch (error) {
      ToastAndroid.show("Error deleting team", ToastAndroid.SHORT);
      console.error("Error deleting team:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    ToastAndroid.show("Trying to delete task", ToastAndroid.SHORT);

    try {
      // Delete task using your backend API
      await axios.delete(
        `https://taskflow-0pva.onrender.com/api/tasks/${taskId}`
      );
      ToastAndroid.show("deleted task", ToastAndroid.SHORT);
      fetchTeamsAndTasks(); // Refresh teams and tasks after deletion
      setLoading(false);
    } catch (error) {
      ToastAndroid.show("Error deleting task", ToastAndroid.SHORT);
      console.error("Error deleting task:", error);
      setLoading(false);
    }
  };
  const navigateToTeamDetail = (teamId) => {
    // Navigate to the TeamDetail screen with the selected teamId
    navigation.navigate("TeamDetail", { teamId });
  };

  const navigateToTaskDetail = (taskId) => {
    // Navigate to the TaskDetail screen with the selected taskId
    navigation.navigate("TaskDetail", { taskId });
  };

  return (
    <View style={styles.container}>
      {/* ... existing code */}

      <Text style={styles.sectionHeader}>Teams</Text>
      {teams ? (
        <FlatList
          data={teams}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToTeamDetail(item._id)}>
              <View style={styles.item}>
                <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                {isAdmin && (
                  // <TouchableOpacity>
                  <Pressable onPress={() => handleDeleteTeam(item._id)}>
                    <Delete size={20} name="trash" />
                  </Pressable>
                  // </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>Loading</Text>
      )}

      <Text style={styles.sectionHeader}>Tasks</Text>
      {tasks ? (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToTaskDetail(item._id)}>
            <View style={styles.item}>
              <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
              {isAdmin && (
                // <TouchableOpacity>
                <Pressable onPress={() => handleDeleteTask(item._id)}>
                  <Delete size={20} name="trash" />
                </Pressable>
                // </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
          )}
        />
      ) : (
        <Text>Loading</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "white",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  adminControls: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#d5b9eb",
    padding: 10,
    borderRadius: 10,
  },
});

export default TeamsAndTasksScreen;
