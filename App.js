import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './components/DashboardScreen';
import ActivityLogScreen from './components/ActivityLogScreen';
import HealthTipsScreen from './components/HealthTipsScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Use different icons for Android and iOS
          if (route.name === 'Dashboard') {
            iconName =  'speedometer';
          } else if (route.name === 'Activity Log') {
            iconName = 'fitness';
          } else if (route.name === 'Health Tips') {
            iconName = 'heart';
          }

          // Return the icon component with appropriate icon
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>

        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Activity Log" component={ActivityLogScreen} />
        <Tab.Screen name="Health Tips" component={HealthTipsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
