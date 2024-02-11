// screens/LoginScreen.js
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import Toast from "react-native-toast-message";

const LoginScreen = ({ navigation }) => {
  const { login, admin, setUser, user, setAdmin,setAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://taskflow-0pva.onrender.com/api/login",
        {
          email,
          password,
        }
      );
      setLoading(false);
      console.log("login done");
      ToastAndroid.show("Trying to login", ToastAndroid.SHORT);
      
    } catch (error) {
      ToastAndroid.show("Invalid credentials", ToastAndroid.SHORT);
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const { data } = await axios.get(
          `https://taskflow-0pva.onrender.com/api/profile`
        );
        const userinfo = data.user;
        setUser(userinfo);
        console.log(user, ":user current");
        if (user.role == "admin") {
          setAdmin(true);
        }
        console.log(admin, "admin");
        setAuthenticated(true);
        ToastAndroid.show("Trying to login", ToastAndroid.SHORT);
        navigation.navigate("Profile");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchuser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" disabled={loading} onPress={handleLogin} />
      <View
        onPress={() => navigation.navigate("Register")}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <Text>New user?</Text>
        <Text style={{ fontWeight: "800", color: "#2196f3" }}> Register</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
  },
});

export default LoginScreen;
