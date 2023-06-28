import React, {useEffect, useState} from 'react';
import firebase from 'firebase/app';
import {initializeApp} from 'firebase/app';
import {StatusBar} from 'expo-status-bar';
import {Switch, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import Login from './screens/Login';
import {onAuthStateChanged} from 'firebase/auth';
import RootNavigation from './navigation';
import './firebaseConfig';
import {firebaseConfig} from './firebaseConfig';
import {useColorScheme} from 'nativewind';

export default function App() {
  // const {colorScheme, toggleColorScheme} = useColorScheme();
  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Login" component={Login} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <RootNavigation />
  );
}
// <View className="flex-1 light:bg-slate-200  ">
//   <Switch value={colorScheme === 'light'} onChange={toggleColorScheme} />
//   <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
