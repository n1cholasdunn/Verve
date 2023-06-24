import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import RealmContext from './realm';

const {RealmProvider} = RealmContext;

export default function App() {
  return (
    <RealmProvider>
      <View style={styles.container}>
        <Text>Verve</Text>
        <StatusBar style="auto" />
      </View>
    </RealmProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
