import {ScrollView, Text, View} from 'react-native';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CalorieChart from '../components/charts/CalorieChart';
import CarbsChart from '../components/charts/CarbsChart';
import ProteinChart from '../components/charts/ProteinChart';
import FatChart from '../components/charts/FatChart';
import MuscleChart from '../components/charts/MuscleChart';
import WeightChart from '../components/charts/WeightChart';

const Statistics = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text className="mb-20 mt-8 font-bold text-5xl text-[#ffffff]">
          Statistics
        </Text>
        <Text className=" mb-5 text-3xl text-[#606368]">Weight</Text>
        <View>
          <WeightChart />
        </View>
        <Text className=" mb-5 text-3xl text-[#606368]">Nutrition</Text>
        <ScrollView horizontal={true} className="mb-16">
          <CalorieChart />
          <CarbsChart />
          <ProteinChart />
          <FatChart />
        </ScrollView>
        <Text className=" mb-5 text-3xl text-[#606368]">Workout</Text>
        <ScrollView horizontal={true} className="mb-16">
          <MuscleChart />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Statistics;
