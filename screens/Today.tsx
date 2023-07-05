import React, {useContext, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, Pressable} from 'react-native';
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
import TodayMuscleDiagram from '../components/TodayMuscleDiagram';

const Today = ({navigation}) => {
  let today = new Date().toLocaleString().slice(0, 10);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const userContext = useContext(AuthContext);
  const [requirement, setRequirement] = useState({
    calories: 0,
    carbs: 0,
    fat: 0,
    protein: 0,
  });
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
    const requirementQuery = collection(db, 'requirement-test');
    onSnapshot(requirementQuery, snapshot => {
      let requirementList = [];
      snapshot.docs.map(doc =>
        requirementList.push({...doc.data(), id: doc.id})
      );

      let recentRequirement = requirementList.slice(-1).pop();
      setRequirement({
        ...recentRequirement,
        calories: recentRequirement.calories,
        carbs: recentRequirement.carbs,
        fat: recentRequirement.fat,
        protein: recentRequirement.protein,
      });
    });
  }, []);

  return (
    <SafeAreaView className="bg-zinc-950 h-full ">
      <ScrollView className="mx-2">
        <Text className="mb-16 mt-8 font-bold text-5xl text-[#ffffff]">
          Today's Stats
        </Text>

        <ScrollView horizontal={true}>
          <Pressable
            onPress={() => {
              navigation.navigate('Nutrition');
            }}>
            <View className="m-2.5 p-4 h-60 w-[300px] bg-[#1E1E1E] flex-row">
              <Text className=" mb-3 text-3xl text-[#606368]">Diet</Text>
              <View className="absolute top-20 left-4 flex-row flex justify-center ">
                <TodayChart
                  data={{
                    name: 'calories',
                    infoFor: calories,
                    color: 'rgba(255, 255, 255',
                    chartSize: 120,
                    radius: 52,
                    width: 16,
                  }}
                />
                <View className="relative right-[120px] top-11  h-10 w-[120px] flex  ">
                  <Text className=" text-center text-lg text-[#606368]">
                    {calories / requirement.calories > 1
                      ? '100'
                      : Math.floor((calories / requirement.calories) * 100)}
                    %
                  </Text>
                </View>
              </View>
              <View className="left-24 top-8">
                <View className="flex-row items-center">
                  <TodayChart
                    data={{
                      name: 'carbs',
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
                      name: 'protein',
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
                      name: 'fat',
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
          </Pressable>

          <View className="m-2.5 p-4 h-60 w-[300px] bg-[#1E1E1E] flex-column">
            <Text className=" mb-1 text-3xl text-[#606368]">Workouts</Text>
            <Pressable
              onPress={() => {
                navigation.navigate('Workouts');
              }}>
              <View className="flex items-center pb-28">
                <TodayMuscleDiagram day={today} user={userContext.UserUID} />
              </View>
            </Pressable>
          </View>
        </ScrollView>
        <View className="flex flex-row "></View>
        <View>
          <Text className="text-2xl font-bold text-slate-200">
            Your Progress
          </Text>

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
