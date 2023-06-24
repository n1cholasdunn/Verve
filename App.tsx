import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {Text, View} from 'react-native';
import RealmContext from './realm';

const {RealmProvider} = RealmContext;

export default function App() {
  return (
    <RealmProvider>
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-slate-400">NICK TOKA REACT APP</Text>
        <StatusBar style="auto" />
      </View>
    </RealmProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
