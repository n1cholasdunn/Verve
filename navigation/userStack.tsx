import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import UserProfile from '../screens/UserProfile';
import Today from '../screens/Today';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function userStack() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'UserProfile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Your Day') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          }
          // else if (route.name === 'Your Day') {
          //   iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          // }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {position: 'absolute', backgroundColor: '#09090b'},

        tabBarActiveTintColor: '#01DBC6',
        tabBarInactiveTintColor: '#606368',
      })}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Dashboard',
          headerStyle: {
            backgroundColor: '#09090b',
          },
          headerTintColor: '#e2e8f0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="Your Day"
        component={Today}
        options={{
          title: 'Your Day',
          headerStyle: {
            backgroundColor: '#09090b',
          },
          headerTintColor: '#e2e8f0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: '#09090b',
          },
          headerTintColor: '#e2e8f0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  );
}
