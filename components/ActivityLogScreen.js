import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mockActivities = [
  { date: '2024-09-05', steps: 7000, calories: 300, exercise: 'Running' },
  { date: '2024-09-04', steps: 6500, calories: 250, exercise: 'Cycling' },
  { date: '2024-09-03', steps: 8000, calories: 350, exercise: 'Swimming' },
  { date: '2024-09-02', steps: 4000, calories: 200, exercise: 'Walking' },
  { date: '2024-09-01', steps: 5000, calories: 220, exercise: 'Yoga' },
];

const ActivityLogScreen = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedActivities = await AsyncStorage.getItem('activities');
        if (storedActivities) {
          setActivities(JSON.parse(storedActivities));
        } else {
          setActivities(mockActivities);
        }
      } catch (error) {
        console.log('Error fetching activities', error);
      }
    };

    fetchData();
  }, []);

  const renderActivityItem = ({ item }) => (
    <View style={styles.activityItem}>
      <Text style={styles.activityDate}>{item.date}</Text>
      <Text>Steps: {item.steps}</Text>
      <Text>Calories: {item.calories}</Text>
      <Text>Exercise: {item.exercise}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity Log</Text>
      <FlatList
        data={activities}
        renderItem={renderActivityItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Clear Log" onPress={() => AsyncStorage.removeItem('activities')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activityItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  activityDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default ActivityLogScreen;
