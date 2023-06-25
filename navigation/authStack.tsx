import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../app/screens/Login';
import Register from '../app/screens/Register';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Registration page" component={Register} />
        <Stack.Screen name="Login page" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
