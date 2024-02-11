import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const ProfileScreen = ({navigation}) => {
    const {user,setUser} = useContext(AuthContext)

if(!user){
    navigation.navigate("Login")
}
  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" }} style={styles.profilePic} />
       <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.email}>{user.email}</Text>      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  teamItem: {
    marginBottom: 10,
  },
  taskItem: {
    marginBottom: 10,
  },
});

export default ProfileScreen;
