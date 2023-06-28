import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {onSnapshot, collection} from '@firebase/firestore';
import {db} from '../firebaseConfig';
import {color} from '@rneui/base';

const MealData = ({day, mealType}) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mealQuery = collection(db, 'meal-test');
    onSnapshot(mealQuery, snapshot => {
      let mealList = [];
      snapshot.docs.map(doc => mealList.push({...doc.data(), id: doc.id}));
      mealList = mealList.filter(meal => {
        return meal.type === mealType && meal.date === day;
      });
      setMeals(mealList);
      setLoading(false);
    });
  }, []);
  //flatlist for ingredients
  const renderMeals = ({item}) => (
    <View style={styles.mealCard}>
      <Text style={{fontSize: 20, color: '#BB86FC'}}>{item.name}</Text>
      <Text style={{color: '#606368'}}>Ingredients: {item.ingredients}</Text>
      <Text style={{color: '#606368'}}>Calories: {item.totalCalories}</Text>
      <Text style={{color: '#606368'}}>Protein: {item.totalProtein}</Text>
      <Text style={{color: '#606368'}}>Carbs: {item.totalCarbs}</Text>
      <Text style={{color: '#606368'}}>Fat: {item.totalFat}</Text>
      <Text style={{color: '#606368'}}>Date: {item.date.toString()}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <FlatList
            data={meals}
            renderItem={renderMeals}
            horizontal={true}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mealCard: {
    margin: 10,
    padding: 15,
    height: 180,
    width: 300,
    backgroundColor: '#1E1E1E',
  },
});

export default MealData;
