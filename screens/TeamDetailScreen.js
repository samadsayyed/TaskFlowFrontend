// screens/TeamDetailScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon3 from "react-native-vector-icons/Ionicons";
import axios from "axios";

const TeamDetailScreen = ({ route }) => {
  const { teamId } = route.params;
  const [teamDetails, setTeamDetails] = useState(null);

  
  const fetchTeamDetails = async () => {
    try {
      // Fetch team details from your backend API based on teamId
      const response = await axios.get(
        `https://taskflow-0pva.onrender.com/api/teams/${teamId}`
        );
        setTeamDetails(response.data);
      } catch (error) {
        console.error("Error fetching team details:", error);
      }
    };
    useEffect(() => {
      fetchTeamDetails();
    }, []);
  return (
    <View style={styles.container}>

      {teamDetails ? (
        <>
          <View style={{ width: "90%", height: "95%" }}>
            <Text style={styles.header}>
              Team Name:{teamDetails.name}
            </Text>

            {teamDetails.members.length !== 0 ? (
              teamDetails.members.map((i,index) => (
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
                  key={index}
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
                      // key={users._id}
                    >
                      {i?.username}
                    </Text>
                    <Text>{i.email}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text>No member in this team</Text>
            )}
            {/* Display other team details here */}
          </View>
        </>
      ) : (
        <Text>Loading team details...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    height: "100%",
    backgroundColor:"white"
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default TeamDetailScreen;
