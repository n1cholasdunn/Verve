import {Text, TextInput, View, StyleSheet, Pressable} from 'react-native';
import React, {Component, useState} from 'react';
import {addDoc, collection} from '@firebase/firestore';
import {db} from '../firebaseConfig';

const MealForm = ({mealType}) => {
  let today = new Date().toISOString().slice(0, 10);
  const [meal, setMeal] = useState({
    name: '',
    ingredients: [],
    totalCalories: 0,
    totalCarbs: 0,
    totalProtein: 0,
    totalFat: 0,
    type: '',
    date: '',
  });

  function addMeal() {
    const mealDb = collection(db, 'meal-test');
    addDoc(mealDb, {
      name: meal.name,
      ingredients: meal.ingredients,
      totalCalories: meal.totalCalories,
      totalCarbs: meal.totalCalories,
      totalProtein: meal.totalProtein,
      totalFat: meal.totalFat,
      type: mealType,
      date: today,
    });
  }

  return (
    <View
      style={{
        margin: 10,
        padding: 15,
        height: 600,
        width: 350,
        backgroundColor: '#1E1E1E',
      }}>
      <Text className="text-[#FFFFFF]">Name</Text>
      <TextInput
        style={styles.input}
        placeholder="name"
        value={meal.name}
        onChangeText={input => {
          setMeal({...meal, name: input});
        }}
      />
      <Text className="text-[#FFFFFF]">ingredients</Text>
      <TextInput
        style={styles.input}
        placeholder="name"
        onChangeText={input => {
          setMeal({
            ...meal,
            ingredients: input.replaceAll(',', '').split(' '),
          });
        }}
      />
      <Text className="text-[#FFFFFF]">Calories(kcal)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={meal.totalCalories.toString()}
        onChangeText={input => {
          setMeal({...meal, totalCalories: +input});
        }}
      />
      <Text className="text-[#FFFFFF]">Protein(g)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={meal.totalProtein.toString()}
        onChangeText={input => {
          setMeal({...meal, totalProtein: +input});
        }}
      />
      <Text className="text-[#FFFFFF]">Carbs(g)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={meal.totalCarbs.toString()}
        onChangeText={input => {
          setMeal({...meal, totalCarbs: +input});
        }}
      />
      <Text className="text-[#FFFFFF]">Fat(g)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={meal.totalFat.toString()}
        onChangeText={input => {
          setMeal({...meal, totalFat: +input});
        }}
      />
      <View style={{alignItems: 'center'}}>
        <Pressable onPress={addMeal} style={styles.addButton}>
          <Text style={{fontSize: 20, fontWeight: '600'}}>Add Meal</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: 'white',
    borderColor: 'white',
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#BB86FC',
    height: 40,
    width: 300,
  },
});

export default MealForm;
