import React from 'react';
import {View, Text} from 'react-native';

const Explore = () => {
  return (
    <View>
      <Text className="text-2xl font-bold self-center">Explore</Text>
      <View className="flex flex-row justify-between px-6">
        <View>
          <Text className="font-semibold">Meals</Text>
        </View>
        <View>
          <Text className="font-semibold">Workouts</Text>
        </View>
      </View>
    </View>
  );
};

export default Explore;
