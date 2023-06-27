import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Explore from '../../components/Explore';

const Today = () => {
  return (
    <SafeAreaView className="bg-zinc-950 h-full w-full">
      <View>
        <Text className="text-2xl font-bold text-white">Today's Stats</Text>
      </View>
      <View>
        <View>
          <Text className="text-white">Diet</Text>
        </View>
        <View>
          <View>
            <Text className="text-white">Calories</Text>
            <Text className="text-white">Macros</Text>
          </View>
          <View>
            <Text className="text-white">1000/2000 Calories </Text>
            <Text className="text-white">20/55g</Text>
            <Text className="text-white">150/300g</Text>
            <Text className="text-white">30/70g</Text>
          </View>
        </View>
      </View>
      <View>
        <Text className="text-2xl font-bold text-white">Your Progress</Text>
        {/* TODO Weight chart */}
      </View>
      <View>
        <Explore />
      </View>
    </SafeAreaView>
  );
};

export default Today;
