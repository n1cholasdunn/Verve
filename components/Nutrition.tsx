import {Text, View, StyleSheet} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import MealData from './MealData';
import {collection, onSnapshot} from '@firebase/firestore';
import {db} from '../firebaseConfig';

const Nutrition = () => {
  let today = new Date().toISOString().slice(0, 10);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mealQuery = collection(db, 'meal-test');
    onSnapshot(mealQuery, snapshot => {
      let mealList = [];
      snapshot.docs.map(doc => mealList.push({...doc.data(), id: doc.id}));
      mealList = mealList.filter(meal => {
        return meal.date === today;
      });
      let cal = 0;
      let pro = 0;
      let car = 0;
      let fatv = 0;

      mealList.map(meal => {
        cal += meal.totalCalories;
        pro += meal.totalProtein;
        car += meal.totalCarbs;
        fatv += meal.totalFat;
      });
      setCalories(cal);
      setProtein(pro);
      setCarbs(car);
      setFat(fatv);
    });
  }, []);

  return (
    <View>
      <View style={{marginHorizontal: 10}}>
        <Text className="text-cyan-300 text-7xl self-center my-10 font-bold">
          Verve
        </Text>
        <Text className="text-white">Today's Calories: {calories} /2000</Text>
        <Text className="text-white">Protein: {protein}</Text>
        <Text className="text-white">Today's Macros:</Text>
        <Text className="text-white">Carbs: {carbs}</Text>
        <Text className="text-white">Macros: {fat}</Text>
        <Text className="mt-8 text-white text-3xl font-semibold">Meals</Text>
        <Text className="text-xl text-zinc-600 mt-5 font-semibold">
          Breakfast
        </Text>
        <View>
          <MealData day={today} mealType={'breakfast'} />
        </View>
        <Text className="text-xl text-zinc-600 mt-5 font-semibold">Lunch</Text>
        <MealData day={today} mealType={'lunch'} />
        <Text className="text-xl text-zinc-600 mt-5 font-semibold">Dinner</Text>
        <MealData day={today} mealType={'dinner'} />
        <Text className="text-xl text-zinc-600 mt-5 font-semibold">Snacks</Text>
        <MealData day={today} mealType={'snacks'} />
      </View>
    </View>
  );
};

export default Nutrition;
