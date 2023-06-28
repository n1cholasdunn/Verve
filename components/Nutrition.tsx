import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import MealData from './MealData';
import {collection, onSnapshot} from '@firebase/firestore';
import {db} from '../firebaseConfig';
import MealForm from './MealForm';
import {Touchable} from 'react-native';

const Nutrition = () => {
  let today = new Date().toISOString().slice(0, 10);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [addBrstate, setAddBrState] = useState(false);
  const [addLnState, setAddLnState] = useState(false);
  const [addDnState, setAddDnState] = useState(false);
  const [addSnState, setAddSnState] = useState(false);

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
        <View>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View style={styles.mealCard}>
                <Text style={styles.mealType}>Breakfast</Text>
              </View>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => setAddBrState(!addBrstate)}>
                <Text style={styles.mealType} id="breakfastAdd">
                  {addBrstate ? '-' : '+'}
                </Text>
              </TouchableOpacity>
            </View>
            <View>{addBrstate && <MealForm mealType={'breakfast'} />}</View>
          </View>
          <MealData day={today} mealType={'breakfast'} />
        </View>
        <View>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View style={styles.mealCard}>
                <Text style={styles.mealType}>Lunch</Text>
              </View>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => setAddLnState(!addLnState)}>
                <Text style={styles.mealType} id="lunchAdd">
                  {addLnState ? '-' : '+'}
                </Text>
              </TouchableOpacity>
            </View>
            <View>{addLnState && <MealForm mealType={'lunch'} />}</View>
          </View>
          <MealData day={today} mealType={'lunch'} />
        </View>
        <View>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View style={styles.mealCard}>
                <Text style={styles.mealType}>Dinner</Text>
              </View>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => setAddDnState(!addDnState)}>
                <Text style={styles.mealType} id="dinnerAdd">
                  {addDnState ? '-' : '+'}
                </Text>
              </TouchableOpacity>
            </View>
            <View>{addDnState && <MealForm mealType={'dinner'} />}</View>
          </View>
          <MealData day={today} mealType={'dinner'} />
        </View>
        <View>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View style={styles.mealCard}>
                <Text style={styles.mealType}>Snacks</Text>
              </View>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => setAddSnState(!addSnState)}>
                <Text style={styles.mealType} id="snacksAdd">
                  {addSnState ? '-' : '+'}
                </Text>
              </TouchableOpacity>
            </View>
            <View>{addSnState && <MealForm mealType={'snacks'} />}</View>
          </View>
          <MealData day={today} mealType={'snacks'} />
        </View>
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
    marginTop: 20,
    marginBottom: 40,
    color: '#01DBC6',
    fontSize: 80,
    textAlign: 'center',
  },
  text: {
    color: 'white',
  },
  mealType: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#606368',
  },
  mealCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 20,
    marginLeft: 10,
    height: 40,
    width: 300,
    backgroundColor: '#1E1E1E',
  },
  addBtn: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#606368',
    backgroundColor: '#1E1E1E',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 10,
  },
});

export default Nutrition;
