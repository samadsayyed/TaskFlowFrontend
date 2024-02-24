// screens/LoginScreen.js
import axios from "axios";
import React, { useContext, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/AntDesign";
import LoginImg from "../assets/1.png";
import AuthContext from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const { login, admin, setUser, user, setAdmin, setAuthenticated } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    ToastAndroid.show("Loading...", ToastAndroid.SHORT);
    try {
      const { data } = await axios.post(
        "https://taskflow-0pva.onrender.com/api/login",
        {
          email,
          password,
        }
      );
      setLoading(false);
      const userinfo = data.user;
      setUser(userinfo);
      if (user.role == "admin") {
        setAdmin(true);
      }
      setAuthenticated(true);
      ToastAndroid.show("Trying to login", ToastAndroid.SHORT);
      navigation.navigate("Profile");
    } catch (error) {
      ToastAndroid.show("Invalid credentials", ToastAndroid.SHORT);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={LoginImg}
        style={{
          height: 150,
          width: 150,
        }}
      />
      <View style={{ height: "70%", alignContent: "center", width: "90%" }}>
        <Text style={styles.header}>TaskFlow</Text>
        <View style={{ display: "flex", flexDirection: "row", width: "95%" }}>
          <Icon
            name="people"
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
          <Icon2
            name="key"
            backgroundColor="white"
            color={"black"}
            size={35}
            style={{ marginRight: 14 }}
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
          onPress={handleLogin}
        >
          <Text style={styles.text}>Login</Text>
        </Pressable>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            top: 250,
            alignSelf: "center",
          }}
        >
          <Text>{"\n"}New user?</Text>
          <Text
            style={{ fontWeight: "800", color: "purple" }}
            onPress={() => navigation.navigate("Register")}
          >
            {" "}
            {"\n"} Register
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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

export default LoginScreen;
