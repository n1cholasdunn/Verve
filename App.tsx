import React, {useEffect, useState} from 'react';
import firebase from 'firebase/app';
import {initializeApp} from 'firebase/app';
import {StatusBar} from 'expo-status-bar';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import Login from './app/screens/Login';
import {onAuthStateChanged} from 'firebase/auth';
import RootNavigation from './navigation';
import './firebaseConfig';
import {firebaseConfig} from './firebaseConfig';

export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Login" component={Login} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <RootNavigation />
  );
}
