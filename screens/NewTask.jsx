// components/NewTeamForm.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from "@react-native-picker/picker"
const NewTeamForm = () => {
    const [teamName, setTeamName] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        // Fetch list of users from your backend API
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://taskflow-0pva.onrender.com/api/user/all');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);
console.log(users[0]);
    const addUserToTeam = () => {
        if (selectedUser) {
            setUsers([...users, selectedUser]);
            setSelectedUser('');
        }
    };

    const createNewTeam = async () => {
        try {
            // Send a request to your backend API to create a new team with the specified name and selected users
            const response = await axios.post('your-backend-api-url/teams', { teamName, users });
            console.log('Team created successfully:', response.data);
        } catch (error) {
            console.error('Error creating team:', error);
        }
    };

    const renderItem = ({ item }) => (
        <Text style={styles.userItem}>{item.username}</Text>
    );

    return (
        // <View>
        //     <Text>hello
        //     </Text>
        // </View>
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
            onValueChange={(itemValue, itemIndex) => setSelectedUser(itemValue)}
          >
            <Picker.Item style={{borderColor: 'gray',borderWidth: 1,}} label="Select user..." value="" />
            {users.map(user => (
              <Picker.Item style={{fontSize:15}} key={user.userId} label={user.username} value={user} />
            ))}
                <Picker.Item key={"user.userId"} label={"user.username"} value={"user"} />
          </Picker>
          
          <Button title="Add User" onPress={addUserToTeam} />
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
          />
          <Button title="Create Team" onPress={createNewTeam} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    picker: {
        height: 150,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
    },
    userItem: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default NewTeamForm;
