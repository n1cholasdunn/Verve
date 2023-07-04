import {Text, View} from 'react-native';
import React, {Component, useContext, useEffect, useState} from 'react';
import {collection, onSnapshot} from '@firebase/firestore';
import {db} from '../../firebaseConfig';
import {AuthContext} from '../../context/auth';

const CalorieChart = () => {
  let thisMonth = new Date().toLocaleString().slice(5, 7);
  const userContext = useContext(AuthContext);
  const [loggedDates, setLoggedDates] = useState([]);
  useEffect(() => {
    const mealQuery = collection(db, 'meal-test');

    onSnapshot(mealQuery, snapshot => {
      let mealList = [];
      snapshot.docs.map(doc => mealList.push({...doc.data(), id: doc.id}));
      mealList = mealList.filter(meal => {
        return (
          meal.date.slice(5, 7) === thisMonth &&
          meal.userId === userContext.UserUID
        );
      });
      //   const dateList = [];
      const dateMap = {};
      mealList.map(meals => {
        dateMap[meals.date]
          ? (dateMap[meals.date] += meals.totalCalories)
          : (dateMap[meals.date] = meals.totalCalories);
        // dateList.push(meals.date);
      });
      const dateList = Object.entries(dateMap).map(el => ({
        date: el[0],
        totalCalories: el[1],
      }));
      console.log(dateMap);
      console.log(dateList);
      setLoggedDates([...new Set(dateList)]);
    });
  }, []);
  //   console.log(loggedDates);
  return (
    <View>
      <Text>CalorieChart</Text>
    </View>
  );
};

export default CalorieChart;
