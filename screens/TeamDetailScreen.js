// screens/TeamDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const TeamDetailScreen = ({ route }) => {
  const { teamId } = route.params;
  const [teamDetails, setTeamDetails] = useState(null);

  useEffect(() => {
    fetchTeamDetails();
  }, []);

  const fetchTeamDetails = async () => {
    try {
      // Fetch team details from your backend API based on teamId
      const response = await axios.get(`https://taskflow-0pva.onrender.com/api/teams/${teamId}`);
      setTeamDetails(response.data);
    } catch (error) {
      console.error('Error fetching team details:', error);
    }
  };

  return (
    <View style={styles.container}>
      {teamDetails ? (
        <>
          <Text style={styles.header}>{teamDetails.name}</Text>
          <Text>{JSON.stringify(teamDetails)}</Text>
          {/* Display other team details here */}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default TeamDetailScreen;
