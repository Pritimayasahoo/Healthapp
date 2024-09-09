import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const healthTips = [
  { id: '1', title: 'Stay Hydrated', description: 'Drink at least 2 liters of water daily.' },
  { id: '2', title: 'Regular Exercise', description: 'Aim for at least 30 minutes of exercise every day.' },
  { id: '3', title: 'Healthy Eating', description: 'Incorporate fruits and vegetables into every meal.' },
  { id: '4', title: 'Get Enough Sleep', description: 'Sleep 7-9 hours each night for optimal recovery.' },
  { id: '5', title: 'Take Breaks', description: 'Regular breaks during work improve productivity and mental health.' },
];

const HealthTipsScreen = () => {
  const renderTipItem = ({ item }) => (
    <View style={styles.tipCard}>
      <Text style={styles.tipTitle}>{item.title}</Text>
      <Text style={styles.tipDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Tips</Text>
      <FlatList
        data={healthTips}
        renderItem={renderTipItem}
        keyExtractor={(item) => item.id}
      />
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
  tipCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tipDescription: {
    fontSize: 16,
  },
});

export default HealthTipsScreen;
