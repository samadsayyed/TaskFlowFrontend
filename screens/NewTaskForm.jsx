import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";

const NewTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [priority, setPriority] = useState("low");
  const [assignedTo, setAssignedTo] = useState("");
  const [assignedTeam, setAssignedTeam] = useState("");
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // Fetch list of users and teams from your backend API
    const fetchUsersAndTeams = async () => {
      setLoading(true);
      try {
        const [usersResponse, teamsResponse] = await Promise.all([
          axios.get("https://taskflow-0pva.onrender.com/api/user/all"),
          axios.get("https://taskflow-0pva.onrender.com/api/teams"),
        ]);
        setUsers(usersResponse.data);
        setTeams(teamsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users and teams:", error);
        setLoading(false);
      }
    };

    fetchUsersAndTeams();
  }, []);

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || deadline;
    setShowDatePicker(false);
    setDeadline(currentDate);
  };

  const createNewTask = async () => {
    setLoading(true);
    try {
      const newTaskData = {
        title,
        description,
        deadline,
        priority,
        assignedTo,
        assignedTeam,
      };
      const response = await axios.post(
        "https://taskflow-0pva.onrender.com/api/tasks",
        newTaskData
      );
      setLoading(false);
      ToastAndroid.show("Task Created", ToastAndroid.SHORT);
    } catch (error) {
      setLoading(false);
      console.error("Error creating task:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter task description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity onPress={openDatePicker}>
        <Text style={styles.dateText}>Deadline: {deadline.toDateString()}</Text>
      </TouchableOpacity>
      {/* {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={deadline}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )} */}
      <Picker
        selectedValue={priority}
        style={styles.picker}
        onValueChange={(itemValue) => setPriority(itemValue)}
      >
        <Picker.Item label="Low" value="Low" style={{ fontSize: 15 }} />
        <Picker.Item label="Medium" value="Medium" style={{ fontSize: 15 }} />
        <Picker.Item label="High" value="High" style={{ fontSize: 15 }} />
      </Picker>
      <Picker
        selectedValue={assignedTo}
        style={styles.picker}
        onValueChange={(itemValue) => setAssignedTo(itemValue)}
      >
        <Picker.Item
          label="Select assigned user..."
          value=""
          style={{ fontSize: 15 }}
        />
        {users.map((user) => (
          <Picker.Item
            key={user.userId}
            label={user.username}
            style={{ fontSize: 15 }}
            value={user._id}
          />
        ))}
      </Picker>
      <Picker
        selectedValue={assignedTeam}
        style={styles.picker}
        onValueChange={(itemValue) => setAssignedTeam(itemValue)}
      >
        <Picker.Item
          label="Select assigned team..."
          value=""
          style={{ fontSize: 15 }}
        />
        {teams.map((team) => (
          <Picker.Item
            key={team.teamId}
            label={team.name}
            value={team._id}
            style={{ fontSize: 15 }}
          />
        ))}
      </Picker>
      <Pressable
        disabled={loading}
        style={styles.button}
        onPress={createNewTask}
      >
        <Text style={styles.text}>Create Task</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  dateText: {
    marginBottom: 20,
    fontSize: 16,
    color: "black",
    fontWeight: "700",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
    fontSize: 15,
    borderColor: "black,",
    backgroundColor: "#d5b9eb",
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

export default NewTaskForm;
