import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {Component, useContext, useEffect, useState} from 'react';
import MealData from './Nutrition/MealData';
import {collection, onSnapshot} from '@firebase/firestore';
import {db} from '../firebaseConfig';
import MealForm from './Nutrition/MealForm';
import {Touchable} from 'react-native';
import {AuthContext} from '../context/auth';
import {ProgressChart} from 'react-native-chart-kit';
import MacroChart from './Nutrition/MacroChart';
import AddMeal from './Nutrition/AddMeal,';
import {SafeAreaView} from 'react-native-safe-area-context';

const Nutrition = () => {
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
    <SafeAreaView className="pb-[75px] min-h-full">
      <View className="mx-2">
        <Text className="mb-20 mt-8 font-bold text-5xl text-[#ffffff]">
          Nutrition
        </Text>
        <Text className=" mb-5 text-3xl text-[#606368]">Calories</Text>
        <View className="bg-[#1E1E1E] pr-2 py-3 flex-row flex justify-evenly">
          <View className=" w-32 h-32 flex justify-center">
            <ProgressChart
              data={[calories / 2000]}
              width={116}
              hideLegend={true}
              height={116}
              radius={45}
              chartConfig={{
                backgroundGradientFrom: '#1E1E1E',
                backgroundGradientTo: '#1E1E1E',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(187, 134, 252, ${opacity})`,
              }}
            />
          </View>
          <View className="mt-2">
            <View className="flex-row justify-between">
              <Text className=" text-xl text-[#606368]">Goal: </Text>
              <Text className=" text-xl text-[#bb86fc]">2000 Cal</Text>
            </View>
            <View className="flex-row border-b-2 border-[#03dac6] pt-1 justify-between">
              <Text className=" text-xl text-[#606368]">Actual: </Text>
              <Text className=" text-xl text-[#bb86fc] justify-end ">
                {calories} Cal
              </Text>
            </View>
            <View className="flex-row pt-1 justify-between pt-5 ">
              <Text className=" text-xl text-[#606368]">Remaining: </Text>
              <Text className=" text-xl text-[#bb86fc] ">
                {2000 - calories} Cal
              </Text>
            </View>
          </View>
        </View>
        <Text className="mt-16 mb-5 text-3xl text-[#606368] ">Macros</Text>
        <View className="bg-[#1E1E1E] py-5 flex-row flex justify-between">
          <MacroChart
            macro={{
              name: 'Carbs',
              data: carbs,
              className: 'mb-1 text-[#bb86fc]',
              color: 'rgba(187, 134, 252',
            }}
          />
          <MacroChart
            macro={{
              name: 'Protein',
              data: protein,
              className: 'mb-1 text-[#03dac6]',
              color: 'rgba(3, 218, 198',
            }}
          />
          <MacroChart
            macro={{
              name: 'Fat',
              data: fat,
              className: 'mb-1 text-[#cf6679]',
              color: 'rgba(207, 102, 121',
            }}
          />
        </View>
        <Text className="mt-16 text-[#ffffff] text-3xl font-medium">Meals</Text>
        <AddMeal
          data={{
            mealType: 'breakfast',
            mealText: 'Breakfast',
            user: userContext.UserUID,
          }}
        />
        <AddMeal
          data={{
            mealType: 'lunch',
            mealText: 'Lunch',
            user: userContext.UserUID,
          }}
        />
        <AddMeal
          data={{
            mealType: 'dinner',
            mealText: 'Dinner',
            user: userContext.UserUID,
          }}
        />
        <AddMeal
          data={{
            mealType: 'snacks',
            mealText: 'Snacks',
            user: userContext.UserUID,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Nutrition;
