import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {Text, View} from 'react-native';
import {initializeApp, applicationDefault, cert} from 'firebase-admin/app';
import {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from 'firebase-admin/firestore';
import 'dotenv/config';

export default function App() {
  const firebaseConfig = {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: 'verve-d99d7',
    storageBucket: 'verve-d99d7.appspot.com',
    messagingSenderId: '97711789160',
    appId: '1:97711789160:web:71fc9a233f6bbba5e3d7dd',
    measurementId: 'G-VB4ETL6L4N',
  };

  initializeApp();

  const db = getFirestore();
  const docRef = db.collection('users').doc('alovelace');

  const sendDataToFirestore = async () => {
    await docRef.set({
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    });
  };

  const getDataFromFirestoer = async () => {
    const snapshot = await db.collection('users').get();
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  };

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-slate-400">NICK TOKA REACT APP</Text>
      <StatusBar style="auto" />
    </View>
  );
}
