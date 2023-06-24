import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {Text, View} from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-slate-400">NICK TOKA REACT APP</Text>
      <StatusBar style="auto" />
    </View>
  );
}
