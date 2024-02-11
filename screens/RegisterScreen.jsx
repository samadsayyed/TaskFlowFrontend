// screens/RegisterScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ToastAndroid } from "react-native";
import axios from "axios";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const [loading,setLoading] = useState(false)
  const handleRegister = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        "https://taskflow-0pva.onrender.com/api/user/new",
        {
          username: name,
          email,
          password,
        }
      );
      if (response) {
        ToastAndroid.show('Registered as a Employee', ToastAndroid.SHORT);
        navigation.navigate("Home");
      } else {
        ToastAndroid.show('Registration failed', ToastAndroid.SHORT);
      }
      setLoading(false)
    } catch (error) {
      ToastAndroid.show('User already exists', ToastAndroid.SHORT);
      setLoading(false)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
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
      <Button title="Register" disabled={loading} onPress={handleRegister} />
      <Text onPress={() => navigation.navigate("Login")}>New user?Login</Text>
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

export default RegisterScreen;
