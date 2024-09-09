import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit'; // Install this module: npm install react-native-chart-kit
import { Dimensions } from 'react-native';


const DashboardScreen = () => {
  const [steps, setSteps] = useState(5000);
  const [calories, setCalories] = useState(200);
  const [waterIntake, setWaterIntake] = useState(1.5); // in liters
  const screenWidth = Dimensions.get('window').width;

  // Fetch the user data from AsyncStorage (or simulate fetching)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedSteps = await AsyncStorage.getItem('steps');
        const storedCalories = await AsyncStorage.getItem('calories');
        const storedWater = await AsyncStorage.getItem('waterIntake');
        
        if (storedSteps) setSteps(parseInt(storedSteps));
        if (storedCalories) setCalories(parseInt(storedCalories));
        if (storedWater) setWaterIntake(parseFloat(storedWater));
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [4000, 4500, 5000, 5500, 6000, 7000, 8000],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ]
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.metricTitle}>Steps Taken</Text>
        <Text style={styles.metricValue}>{steps} steps</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.metricTitle}>Calories Burned</Text>
        <Text style={styles.metricValue}>{calories} kcal</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.metricTitle}>Water Intake</Text>
        <Text style={styles.metricValue}>{waterIntake} liters</Text>
      </View>

      <Text style={styles.subTitle}>Weekly Steps</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 20}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726'
          }
        }}
        bezier
        style={styles.chartStyle}
      />
    </ScrollView>
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
  subTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
  },
  metricTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  }
});

export default DashboardScreen;
