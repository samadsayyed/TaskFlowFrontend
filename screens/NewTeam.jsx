// components/NewTeamForm.js
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  ToastAndroid,
  Pressable,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
const NewTeamForm = () => {
  const [teamName, setTeamName] = useState("");
  const [teamMember, setTeamMember] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch list of users from your backend API
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://taskflow-0pva.onrender.com/api/user/all"
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        ToastAndroid.show("Some Error Occured", ToastAndroid.SHORT);
        setLoading(false);
      }
    };
    fetchUsers();
  }, [selectedUser]);

  const addUserToTeam = () => {
    if (selectedUser) {
      // setUsers([...users, selectedUser]);
      setTeamMember([...teamMember, selectedUser._id]);
      setSelectedUser("");
    }
  };

  const createNewTeam = async () => {
    ToastAndroid.show("Loading", ToastAndroid.SHORT);
    try {
      // Send a request to your backend API to create a new team with the specified name and selected users
      const response = await axios.post(
        "https://taskflow-0pva.onrender.com/api/teams",
        {
          name: teamName,
          memberIds: teamMember,
        }
      );
      ToastAndroid.show("Team Created successfully", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Error occured", ToastAndroid.SHORT);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.users}>
      <Text style={styles.userItem}>UserID: {item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter team name"
        value={teamName}
        onChangeText={setTeamName}
      />
      <Picker
        selectedValue={selectedUser}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedUser(itemValue);
        }}
      >
        <Picker.Item
          style={{ borderColor: "gray", borderWidth: 1, fontSize: 15 }}
          label="Select user..."
          value=""
        />
        {users.map((user) => (
          <Picker.Item
            style={{ fontSize: 15 }}
            key={user._id}
            label={user.username}
            value={user}
          />
        ))}
      </Picker>

      <Pressable
        disabled={loading}
        style={styles.button}
        onPress={addUserToTeam}
      >
        <Text style={styles.text}>Add User</Text>
      </Pressable>

      <FlatList
        data={teamMember}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        style={{
          marginTop:10
        }}
      />
      <Pressable
        disabled={loading}
        style={styles.button}
        onPress={createNewTeam}
      >
        <Text style={styles.text}>Create Team</Text>
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
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
    fontSize: 15,
    borderColor: "black,",
    backgroundColor: "#d5b9eb",
  },
  userItem: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight:"500"
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
  users:{
    backgroundColor:"#d5b9eb",
    padding:10,
    margin:5,
    borderRadius:10,
    
  }
});

export default NewTeamForm;
