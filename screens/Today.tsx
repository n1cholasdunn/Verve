import React, {useContext} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import Explore from '../components/Explore';
import TodayChart from '../components/charts/TodayChart';
import WeightChart from '../components/charts/WeightChart';
import WeightForm from '../components/WeightForm';
import {AuthContext} from '../context/auth';

const Today = () => {
  const userContext = useContext(AuthContext);

  return (
    <SafeAreaView className="bg-zinc-950 h-full w-full">
      <ScrollView nestedScrollEnabled className="px-2">
        <View>
          <Text className="text-2xl font-bold text-slate-200 mt-2 mb-4">
            Today's Stats
          </Text>
        </View>
        <View>
          <Text className="text-slate-200 text-xl font-semibold px-2">
            Diet
          </Text>
        </View>
        <View className="flex flex-row px-2">
          <View>
            <TodayChart />
          </View>
          <View className="flex flex-row ">
            <View className="mr-2">
              <Text className="text-slate-200">Calories:</Text>
              <Text className="text-slate-200">Macros:</Text>
            </View>
            <View>
              <Text className="text-slate-200">1000/2000 cal</Text>
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
          <WeightForm user={userContext.UserUID} />
        </View>
        <View>
          <Explore />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Today;
