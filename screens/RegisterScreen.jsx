// screens/RegisterScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ToastAndroid,
  Image,
  Pressable,
} from "react-native";
import axios from "axios";
import RegisterIMG from "../assets/2.png";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon3 from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Entypo";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleRegister = async () => {
    setLoading(true);
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
        ToastAndroid.show("Registered as a Employee", ToastAndroid.SHORT);
        navigation.navigate("Home");
      } else {
        ToastAndroid.show("Registration failed", ToastAndroid.SHORT);
      }
      setLoading(false);
    } catch (error) {
      ToastAndroid.show("User already exists", ToastAndroid.SHORT);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={RegisterIMG} />
      <View style={{ height: "70%", alignContent: "center", width: "90%" }}>
        <Text style={styles.header}>Register</Text>
        <View style={{ display: "flex", flexDirection: "row", width: "95%" }}>
          <Icon
            name="people"
            backgroundColor="white"
            color={"black"}
            size={40}
            style={{ marginRight: 12 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={{ display: "flex", flexDirection: "row", width: "95%" }}>
          <Icon2
            name="folder"
            backgroundColor="white"
            color={"black"}
            size={40}
            style={{ marginRight: 12 }}
            onPress={this.loginWithFacebook}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={{ display: "flex", flexDirection: "row", width: "95%" }}>
          <Icon3
            name="key"
            backgroundColor="white"
            color={"black"}
            size={40}
            style={{ marginRight: 12 }}
            onPress={this.loginWithFacebook}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <Pressable
          disabled={loading}
          style={styles.button}
          onPress={handleRegister}
        >
          <Text style={styles.text}>Register</Text>
        </Pressable>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            top: 210,
            alignSelf: "center",
          }}
        >
          <Text>{"\n"}New user?</Text>
          <Text
            style={{ fontWeight: "800", color: "purple" }}
            onPress={() => navigation.navigate("Login")}
          >
            {" "}
            {"\n"} Login
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "white",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  image: {
    alignSelf: "center",
    height: 150,
    width: 150,
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
    width: "80%",
    borderRadius: 10,
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

export default RegisterScreen;
