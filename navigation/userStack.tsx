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
          tabBarStyle: {position: 'absolute', backgroundColor: '#000000'},
        }}>
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Your Day" component={Today} />
        <Tab.Screen name="Profile" component={UserProfile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
