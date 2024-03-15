import React, { useContext, useState } from "react";
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const ProfileScreen = ({ navigation }) => {
  const { user, setUser,isAuthenticated} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://taskflow-0pva.onrender.com/api/logout"
      );
      setLoading(false);
      ToastAndroid.show("Logged out", ToastAndroid.SHORT);
      setUser(null)
      navigation.navigate("Login");
    } catch (error) {
      // console.error(error);
      ToastAndroid.show("No user", ToastAndroid.SHORT);
      setLoading(false);
    }
  };
  
  if (!user?.username) {
    navigation.navigate("Login");
    ToastAndroid.show("Login First profile", ToastAndroid.SHORT);
  }
  

  return (
    <>
      <View style={styles.container}>
        <View>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            }}
            style={styles.profilePic}
          />
          <Text style={styles.username}>{user?.username}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
    
        <Pressable disabled={loading} style={styles.button} onPress={logoutHandler}>
          <Text style={styles.text}>Signout</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: "center",
  },
  username: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  Notification: {
    fontWeight: "400",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f8f4f4",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 70,
  },
  email: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "500",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  teamItem: {
    marginBottom: 10,
  },
  taskItem: {
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "white",
    color: "red",
    shadowColor: "grey",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    position: "absolute",
    bottom: 10,
    width: "95%",
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
});

export default ProfileScreen;
