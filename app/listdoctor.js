import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios'; // Import axios for making HTTP requests

const ListDoctorScreen = ({ userLocation, specialty }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Make request to the API endpoint with userLocation and specialty
        const response = await axios.get(
          `https://beta.myupchar.com/api/v1/get_live_doctors_for_third_party?key=API_KEY&lang=en&location=${userLocation}&specialty=${specialty}`
        );
        setDoctors(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userLocation, specialty]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>List of Doctors</Text>
      <FlatList
        data={doctors}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.doctor_name}</Text>
            <Text>{item.speciality}</Text>
            <Text>{item.location}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ListDoctorScreen;
