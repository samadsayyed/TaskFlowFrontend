import { StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Feather';
import React from "react";
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();
  // console.log(navigation.navigate("Home"));
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        height: 50,
      }}
    >
      <Text onPress={()=>navigation.navigate("Home")} ><Icon3 name="home" size={20} color={"#000"}/></Text>
      <Text onPress={()=>navigation.navigate("TeamsAndTasks")} ><Icon2 name="tasks" size={20} color="#000" /></Text>
      <Text onPress={()=>navigation.navigate("Profile")} ><Icon name="person-outline" size={20} color="#000" /></Text>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({});
