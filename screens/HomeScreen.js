// screens/HomeScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, Button ,StyleSheet} from 'react-native';
import AuthContext from '../context/AuthContext';
import axios from "axios"

const HomeScreen =  ({navigation}) => {
  const {user,setUser} = useContext(AuthContext);
  const isAdmin = user.role==="admin";
  const [loading, setLoading] = useState(false);
  const logoutHandler =async () => {
    setLoading(true)
    try {
      const {data} = await axios.get("https://taskflow-0pva.onrender.com/api/logout")
      console.log(data);
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <View  style={styles.container}>
      <Text style={styles.heading}>{isAdmin?"Welcome admin":"Welcome"}</Text>
      <View style={styles.buttonContainer}>
        <Button title='New Task' />
        <Button title='New Team' onPress={()=>navigation.navigate("NewTeam")}/>
      </View>
      <Button title="Logout" disabled={loading} onPress={logoutHandler} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    padding:10,
  },
  heading: {
color:"black",
fontSize:24,
fontWeight:"bold"
  },
  buttonContainer:{
    display:"flex",
    flexDirection:"row",
    width:"100%",
    backgroundColor:"red",
    justifyContent:"space-around"
  }
});
export default HomeScreen;

