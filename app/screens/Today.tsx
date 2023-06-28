import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import Explore from '../../components/Explore';
import TodayChart from '../../components/charts/TodayChart';
import WeightChart from '../../components/charts/WeightChart';

const Today = () => {
  return (
    <SafeAreaView className="bg-zinc-950 h-full w-full">
      <ScrollView nestedScrollEnabled>
        <View>
          <Text className="text-2xl font-bold text-slate-200 mt-2 mb-4">
            Today's Stats
          </Text>
        </View>
        <View>
          <Text className="text-slate-200 text-xl font-semibold">Diet</Text>
        </View>
        <View className="flex flex-row">
          <View>
            <TodayChart />
          </View>
          <View className="flex flex-row ">
            <View className="mr-3">
              <Text className="text-slate-200">Calories:</Text>
              <Text className="text-slate-200">Macros:</Text>
            </View>
            <View>
              <Text className="text-slate-200">1000/2000 Calories </Text>
              <Text className="text-slate-200">Fat: 20/55g</Text>
              <Text className="text-slate-200">Carbs: 150/300g</Text>
              <Text className="text-slate-200">Protein: 30/70g</Text>
            </View>
          </View>
        </View>
        <View>
          {/* TODO  add button to log weight into database*/}
          <Text className="text-2xl font-bold text-slate-200">
            Your Progress
          </Text>
          {/* TODO Weight chart */}
          <WeightChart />
        </View>
        <View>
          <Explore />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Today;
