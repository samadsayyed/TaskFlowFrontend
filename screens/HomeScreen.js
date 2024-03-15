// screens/HomeScreen.js
import React, { Suspense, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ToastAndroid,
  ScrollView,
} from "react-native";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon3 from "react-native-vector-icons/Ionicons";
import Delete from "react-native-vector-icons/Entypo";

const HomeScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const deleteHandler = async (userId) => {
    ToastAndroid.show("Deleting User...", ToastAndroid.SHORT);
    try {
      const response = await axios.delete(
        `https://taskflow-0pva.onrender.com/api/user/${userId}`
      );
      ToastAndroid.show("User Deleted", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    // Fetch list of users from your backend API
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://taskflow-0pva.onrender.com/api/user/all"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [deleteHandler]);

    if (!user) {
    navigation.navigate("Login");
    ToastAndroid.show("Login first home", ToastAndroid.SHORT);
  }
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>
          {isAdmin ? "Welcome admin" : "Welcome"}
        </Text>
        <Suspense fallback={<>Loading</>}>
          <View
            style={{
              margin: 4,
              padding: 10,
              borderRadius: 20,
            }}
          >
            {users.map((i) => (
              <View
                style={{
                  marginVertical: 5,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#d5b9eb",
                  shadowColor: "black",
                  padding: 10,
                  borderRadius: 15,
                }}
                key={i._id}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    height: 30,
                    width: 30,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20,
                  }}
                >
                  <Icon3 name="person-outline" size={20} color="#000" />
                </View>
                <View style={{ marginHorizontal: 10 }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: 500,
                      textTransform: "uppercase",
                    }}
                    key={users._id}
                  >
                    {i?.username}
                  </Text>
                  <Text>{i?.email}</Text>
                </View>
                {isAdmin && (
                  <View
                    style={{
                      position: "absolute",
                      right: 20,
                    }}
                  >
                    <Delete
                      onPress={() => deleteHandler(i._id)}
                      size={20}
                      name="trash"
                    />
                  </View>
                )}
              </View>
            ))}
          </View>
        </Suspense>
      </ScrollView>
      {isAdmin && (
        <View style={styles.buttonContainer}>
          <View style={styles.circle}>
            <Icon
              name="tasks"
              size={25}
              color="#fff"
              onPress={() => navigation.navigate("NewTask")}
            />
          </View>
          <View style={styles.circle}>
            <Icon2
              name="person-outline"
              size={25}
              onPress={() => navigation.navigate("NewTeam")}
              color="#fff"
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    height: "100%",
  },
  heading: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    height: 140,
    width: 50,
    right: 20,
  },
  circle: {
    padding: 10,
    backgroundColor: "purple",
    borderRadius: 30,
    width: 45,
  },
});
export default HomeScreen;
