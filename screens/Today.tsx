import React, {useContext, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import Explore from '../components/Explore';
import TodayChart from '../components/charts/TodayChart';
import WeightChart from '../components/charts/WeightChart';
import WeightForm from '../components/WeightForm';
import {AuthContext} from '../context/auth';
import Layout from '../components/Layout';
import {collection, onSnapshot} from '@firebase/firestore';
import {db} from '../firebaseConfig';
import {ProgressChart} from 'react-native-chart-kit';
import MacroChart from '../components/Nutrition/MacroChart';

const Today = () => {
  let today = new Date().toLocaleString().slice(0, 10);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const userContext = useContext(AuthContext);

  useEffect(() => {
    const mealQuery = collection(db, 'meal-test');

    onSnapshot(mealQuery, snapshot => {
      let mealList = [];
      snapshot.docs.map(doc => mealList.push({...doc.data(), id: doc.id}));
      mealList = mealList.filter(meal => {
        return meal.date === today && meal.userId === userContext.UserUID;
      });
      let cal = 0;
      let pro = 0;
      let car = 0;
      let fatv = 0;

      mealList.map(meal => {
        cal += meal.totalCalories;
        pro += meal.macros.totalProtein;
        car += meal.macros.totalCarbs;
        fatv += meal.macros.totalFat;
      });
      setCalories(cal);
      setProtein(pro);
      setCarbs(car);
      setFat(fatv);
    });
  }, []);

  return (
    <SafeAreaView className="bg-zinc-950 h-full ">
      <ScrollView className="mx-2">
        <Text className="mb-16 mt-8 font-bold text-5xl text-[#ffffff]">
          Today's Stats
        </Text>

        <ScrollView horizontal={true}>
          <View className="m-2.5 p-4 h-60 w-[300px] bg-[#1E1E1E] flex-row">
            <Text className=" mb-3 text-3xl text-[#606368]">Diet</Text>
            <View></View>
            <View className="absolute top-20 left-4 flex-row flex justify-center ">
              <TodayChart
                data={{
                  infoFor: calories,
                  color: 'rgba(255, 255, 255',
                  chartSize: 120,
                  radius: 52,
                  width: 16,
                }}
              />
              <View className="relative right-[120px] top-11  h-10 w-[120px] flex  ">
                <Text className=" text-center text-lg text-[#606368]">
                  {calories / 2000 > 1 ? '100' : calories / 2000}%
                </Text>
              </View>
            </View>
            <View className="left-24 top-8">
              <View className="flex-row items-center">
                <TodayChart
                  data={{
                    infoFor: carbs,
                    color: 'rgba(187, 134, 252',
                    chartSize: 60,
                    radius: 20,
                    width: 8,
                  }}
                />
                <Text className="text-[#bb86fc] ml-1">Carbs</Text>
              </View>
              <View className="flex-row items-center">
                <TodayChart
                  data={{
                    infoFor: protein,
                    color: 'rgba(3, 218, 198',
                    chartSize: 60,
                    radius: 20,
                    width: 8,
                  }}
                />
                <Text className="text-[#03dac6] ml-1">Protein</Text>
              </View>
              <View className="flex-row items-center">
                <TodayChart
                  data={{
                    infoFor: fat,
                    color: 'rgba(207, 102, 121',
                    chartSize: 60,
                    radius: 20,
                    width: 8,
                  }}
                />
                <Text className="text-[#cf6679] ml-1">Fat</Text>
              </View>
            </View>
          </View>
          <View className="m-2.5 p-4 h-60 w-[300px] bg-[#1E1E1E] flex-column">
            <Text className=" mb-5 text-3xl text-[#606368]">Workouts</Text>
          </View>
        </ScrollView>
        <View className="flex flex-row ">
          <View></View>
          {/* <View className="flex flex-row ">
            <View>
              <Text className="text-slate-200">Calories:</Text>
              <Text className="text-slate-200">Macros:</Text>
            </View>
            <View>
              <Text className="text-slate-200">1000/2000 cal</Text>
              <Text className="text-slate-200">Fat: 20/55g</Text>
              <Text className="text-slate-200">Carbs: 150/300g</Text>
              <Text className="text-slate-200">Protein: 30/70g</Text>
            </View>
          </View> */}
        </View>
        <View>
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
