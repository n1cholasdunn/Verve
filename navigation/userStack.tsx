import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../app/screens/Dashboard';

const Tab = createBottomTabNavigator();

export default function userStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="dashboard" component={Dashboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
