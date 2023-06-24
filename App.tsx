import React, {useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import Login from './app/screens/Login';
import {onAuthStateChanged} from 'firebase/auth';

const Stack = createNativeStackNavigator();

export default function App() {
  // const [authenticated, setAuthenticated] = useState(false)
  // useEffect(() => {
  //   onAuthStateChanged;
  // });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// //Use this function to see if user is signed in

// onAuthStateChanged(FIREBASE_AUTH, (user)=>{
//   if(user){

//   }else{

//   }
// })
