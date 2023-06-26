import {FlatList, SafeAreaView, ScrollView, Text, View} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {onSnapshot, collection} from '@firebase/firestore';
import {db} from '../firebaseConfig';

const MealData = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mealQuery = collection(db, 'meal-test');
    onSnapshot(mealQuery, snapshot => {
      let mealList = [];
      snapshot.docs.map(doc => mealList.push({...doc.data(), id: doc.id}));
      setMeals(mealList);
      setLoading(false);
    });
  }, []);

  const renderMeals = ({item}) => (
    <View style={{marginTop: 10, padding: 15}}>
      <Text>Name: {item.name}</Text>
      <Text>Ingredients:{item.ingredients}</Text>
      <Text>Calories: {item.totalCalories}</Text>
      <Text>Protein: {item.totalProtein}</Text>
      <Text>Fat: {item.totalFat}lbs</Text>
      <Text>Date: {item.date.toString()}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text style={{marginTop: 40, fontWeight: 'bold'}}>Added Meals</Text>
        </View>

        <FlatList
          data={meals}
          renderItem={renderMeals}
          horizontal={true}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MealData;
