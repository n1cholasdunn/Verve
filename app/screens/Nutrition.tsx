import {Text, View} from 'react-native';
import React, {Component} from 'react';
import MealData from '../../components/MealData';

const Nutrition = () => {
  let today = new Date().toISOString().slice(0, 10);
  return (
    <View>
      <Text>Calories</Text>
      <Text>Macros</Text>
      <Text style={{marginTop: 40, fontWeight: 'bold', fontSize: 30}}>
        Meals
      </Text>

      <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 20}}>
        Breakfast
      </Text>
      <MealData day={today} mealType={'breakfast'} />
      <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 20}}>
        Lunch
      </Text>
      <MealData day={today} mealType={'lunch'} />
      <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 20}}>
        Dinner
      </Text>
      <MealData day={today} mealType={'dinner'} />
      <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 20}}>
        Snacks
      </Text>
      <MealData day={today} mealType={'snacks'} />
    </View>
  );
};

export default Nutrition;
