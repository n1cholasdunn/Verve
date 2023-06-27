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
    <View style={styles.container}>
      <View style={{marginHorizontal: 10}}>
        <Text style={styles.title}>Verve</Text>
        <Text style={styles.text}>Today's Calories: {calories} /2000</Text>
        <Text style={styles.text}>Today's Macros:</Text>
        <Text style={styles.text}>Protein: {protein}</Text>
        <Text style={styles.text}>Carbs: {carbs}</Text>
        <Text style={styles.text}>Macros: {fat}</Text>
        <Text
          style={{
            marginTop: 40,
            fontWeight: 'bold',
            fontSize: 30,
            color: 'white',
          }}>
          Meals
        </Text>

        <Text style={styles.mealType}>Breakfast</Text>
        <View>
          <MealData day={today} mealType={'breakfast'} />
        </View>
        <Text style={styles.mealType}>Lunch</Text>
        <MealData day={today} mealType={'lunch'} />
        <Text style={styles.mealType}>Dinner</Text>
        <MealData day={today} mealType={'dinner'} />
        <Text style={styles.mealType}>Snacks</Text>
        <MealData day={today} mealType={'snacks'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
  },
  title: {
    marginTop: 50,
    marginBottom: 40,
    color: '#01DBC6',
    fontSize: 80,
    textAlign: 'center',
  },
  text: {
    color: 'white',
  },
  mealType: {marginTop: 20, fontWeight: 'bold', fontSize: 20, color: '#606368'},
});

export default Nutrition;
