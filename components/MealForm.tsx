import {Text, TextInput, View, StyleSheet, Pressable} from 'react-native';
import React, {Component, useState, useEffect, useReducer} from 'react';
import {addDoc, collection} from '@firebase/firestore';
import {db} from '../firebaseConfig';
import {fetchIngredientInfo} from '../utils/recipeApi';
import {set} from 'firebase/database';

const MealForm = ({mealType, user}) => {
  let today = new Date().toLocaleString().slice(0, 10);

  // const [calorieContent, setCalorieContent] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [calorieContent, setCalorieContent] = useState(0);
  const [proteinContent, setProteinContent] = useState(0);
  const [fatContent, setFatContent] = useState(0);
  const [carbContent, setCarbContent] = useState(0);

  const [meal, setMeal] = useState({
    name: '',
    ingredients: [],
    totalCalories: 0,
    macros: {
      totalCarbs: 0,
      totalProtein: 0,
      totalFat: 0,
    },
    type: '',
    date: '',
    userId: '',
  });

  useEffect(() => {
    getNutrientInfo();
  }, [ingredients]);

  const getNutrientInfo = async () => {
    // console.log(meal.ingredients);

    ingredients.map(async ingredient => {
      const ingredientInfo = await fetchIngredientInfo(ingredient);
      setCalorieContent(ingredientInfo.calories);
      setCarbContent(ingredientInfo.totalNutrients.CHOCDF.quantity);
      setProteinContent(ingredientInfo.totalNutrients.PROCNT.quantity),
        setFatContent(ingredientInfo.totalNutrients.FAT.quantity);
    });
  };

  const addMeal = async () => {
    const mealDb = collection(db, 'meal-test');

    addDoc(mealDb, {
      name: meal.name,
      ingredients: ingredients,
      totalCalories: calorieContent,
      macros: {
        totalCarbs: Number(carbContent.toFixed(1)),
        totalProtein: Number(proteinContent.toFixed(1)),
        totalFat: Number(fatContent.toFixed(1)),
      },
      type: mealType,
      date: today,
      userId: user,
    });
  };

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
        placeholder="ingredients"
        // onChangeText={input => {
        //   setMeal({
        //     ...meal,
        //     ingredients: input.split(','),
        //   });
        // }}
        onEndEditing={event => {
          setIngredients(event.nativeEvent.text.split(','));
        }}
      />

      {/* <Text className="text-[#FFFFFF]">Calories(kcal)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={meal.totalCalories.toString()}
        onChangeText={input => {
          setMeal({...meal, totalCalories: +input});
        }}
      /> */}
      {/* <Text className="text-[#FFFFFF]">Protein(g)</Text>
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
      /> */}
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
