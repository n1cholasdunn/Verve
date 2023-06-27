import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../app/screens/Dashboard';
import UserProfile from '../app/screens/UserProfile';
import Today from '../app/screens/Today';

const Tab = createBottomTabNavigator();

export default function userStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {position: 'absolute', backgroundColor: '#09090b'},
        }}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Dashboard',
            headerStyle: {
              backgroundColor: '#09090b',
            },
            headerTintColor: '#fff',
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
            headerTintColor: '#fff',
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
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
