import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Ionicons from '@expo/vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Stack = createStackNavigator();
// <Ionicons name="arrow-back-circle-outline"></Ionicons>
export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Registration page"
          component={Register}
          options={{
            title: 'Register',
            headerStyle: {
              backgroundColor: '#09090b',
            },
            headerTintColor: '#e2e8f0',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Login page"
          component={Login}
          options={{
            title: 'Login',
            headerStyle: {
              backgroundColor: '#09090b',
            },
            headerTintColor: '#e2e8f0',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => (
              <TouchableOpacity>
                <Ionicons
                  name="arrow-back-outline"
                  size={24}
                  color="#e2e8f0"
                  // onPress={}
                />
              </TouchableOpacity>
            ),
            // headerBackImage: () => (
            //   <Ionicons name="arrow-back-circle-outline"></Ionicons>
            // ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
