import {Text, TextInput, View, StyleSheet, Pressable} from 'react-native';
import React, {Component, useState, useEffect, useReducer} from 'react';
import {addDoc, collection} from '@firebase/firestore';
import {db} from '../../firebaseConfig';
import {fetchIngredientInfo} from '../../utils/recipeApi';

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
    ingredients.map(async ingredient => {
      const ingredientInfo = await fetchIngredientInfo(ingredient);
      setCalorieContent(calorieContent + ingredientInfo.calories);
      setCarbContent(
        carbContent + ingredientInfo.totalNutrients.CHOCDF.quantity
      );
      setProteinContent(
        proteinContent + ingredientInfo.totalNutrients.PROCNT.quantity
      ),
        setFatContent(fatContent + ingredientInfo.totalNutrients.FAT.quantity);
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
    setIngredients([]);
    console.log(ingredients);
  };

  return (
    <View className="my-2.5 px-4 py-10 h-fit, w-[350px] bg-[#1E1E1E]">
      <Text className="text-[#FFFFFF]">Name</Text>
      <TextInput
        className="h-10 w-[300px] m-3 p-2.5 border border-[#ffffff] rounded-lg text-[#ffffff] mb-10"
        placeholder="name"
        value={meal.name}
        onChangeText={input => {
          setMeal({...meal, name: input});
        }}
      />
      <Text className="text-[#FFFFFF]">ingredients</Text>
      <TextInput
        className="h-10 w-[300px] m-3 p-2.5 border border-[#ffffff] rounded-lg text-[#ffffff] mb-20"
        placeholder="ingredients"
        onEndEditing={event => {
          setIngredients(event.nativeEvent.text.split(','));
        }}
      />

      <View style={{alignItems: 'center'}}>
        <Pressable
          onPress={addMeal}
          className="h-16 w-[300px] border rounded-full bg-[#BB86FC] flex items-center justify-center">
          <Text style={{fontSize: 20, fontWeight: '600'}}>Add Meal</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MealForm;
