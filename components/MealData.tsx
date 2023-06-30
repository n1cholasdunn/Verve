import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import React, {Component, useContext, useEffect, useState} from 'react';
import {onSnapshot, collection, doc, deleteDoc} from '@firebase/firestore';
import {getDatabase, ref, remove} from 'firebase/database';
import {db} from '../firebaseConfig';
import {color} from '@rneui/base';
import {AuthContext} from '../context/auth';
import {AntDesign} from '@expo/vector-icons';

const MealData = ({day, mealType, user}) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mealQuery = collection(db, 'meal-test');
    onSnapshot(mealQuery, snapshot => {
      let mealList = [];
      snapshot.docs.map(doc => mealList.push({...doc.data(), id: doc.id}));
      mealList = mealList.filter(meal => {
        return (
          meal.type === mealType && meal.date === day && meal.userId === user
        );
      });
      setMeals(mealList);
      setLoading(false);
    });
  }, []);

  const handleDelete = async meal => {
    console.log(meal);
    try {
      await deleteDoc(doc(db, 'meal-test', meal));
    } catch (error) {
      console.log(error);
    }
  };

  //flatlist for ingredients
  const renderMeals = ({item}) => (
    <View className="m-2.5 p-4 h-44 w-[300px] bg-[#1E1E1E] flex-row">
      <View>
        <Text style={{fontSize: 20, color: '#BB86FC'}}>{item.name}</Text>
        <Text style={{color: '#606368'}}>Ingredients: {item.ingredients}</Text>
        <Text style={{color: '#606368'}}>Calories: {item.totalCalories}</Text>
        <Text style={{color: '#606368'}}>Protein: {item.totalProtein}</Text>
        <Text style={{color: '#606368'}}>Carbs: {item.totalCarbs}</Text>
        <Text style={{color: '#606368'}}>Fat: {item.totalFat}</Text>
        <Text style={{color: '#606368'}}>Date: {item.date.toString()}</Text>
      </View>
      <View className="ml-[55px]">
        <Pressable onPress={() => handleDelete(item.id)}>
          <AntDesign name="delete" size={24} color="#606368" />
        </Pressable>
      </View>
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
