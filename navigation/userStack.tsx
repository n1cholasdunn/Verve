import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../app/screens/Dashboard';
import Nutrition from '../app/screens/Nutrition';

const Tab = createBottomTabNavigator();

export default function userStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="dashboard" component={Dashboard} />
        <Tab.Screen name="nutrition" component={Nutrition} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
