import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Explore from '../../components/Explore';
import TodayChart from '../../components/charts/TodayChart';
import WeightChart from '../../components/charts/WeightChart';

const Today = () => {
  return (
    <SafeAreaView className="bg-zinc-950 h-full w-full">
      <View>
        <Text className="text-2xl font-bold text-slate-300 mt-2 mb-4">
          Today's Stats
        </Text>
      </View>
      <View>
        <Text className="text-slate-300 text-xl">Diet</Text>
      </View>
      <View className="flex flex-row">
        <View>
          <TodayChart />
        </View>
        <View className="flex flex-row ">
          <View className="mr-3">
            <Text className="text-slate-300">Calories:</Text>
            <Text className="text-slate-300">Macros:</Text>
          </View>
          <View>
            <Text className="text-slate-300">1000/2000 Calories </Text>
            <Text className="text-slate-300">Fat: 20/55g</Text>
            <Text className="text-slate-300">Carbs: 150/300g</Text>
            <Text className="text-slate-300">Protein: 30/70g</Text>
          </View>
        </View>
      </View>
      <View>
        <Text className="text-2xl font-bold text-slate-300">Your Progress</Text>
        {/* TODO Weight chart */}
        <WeightChart />
      </View>
      <View>
        <Explore />
      </View>
    </SafeAreaView>
  );
};

export default Today;
