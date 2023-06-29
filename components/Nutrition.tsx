import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {Component, useContext, useEffect, useState} from 'react';
import MealData from '../components/MealData';
import {collection, onSnapshot} from '@firebase/firestore';
import {db} from '../firebaseConfig';
import MealForm from './MealForm';
import {Touchable} from 'react-native';
import {AuthContext} from '../context/auth';
import {ProgressChart} from 'react-native-chart-kit';

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
  const userContext = useContext(AuthContext);

  useEffect(() => {
    const mealQuery = collection(db, 'meal-test');

    onSnapshot(mealQuery, snapshot => {
      let mealList = [];
      snapshot.docs.map(doc => mealList.push({...doc.data(), id: doc.id}));
      mealList = mealList.filter(meal => {
        return meal.date === today && meal.userId === userContext.UserUID;
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
    <View className="pb-[75px] min-h-full px-[2px]">
      <View style={{marginHorizontal: 10}}>
        <Text className="mb-10 mt-20  font-bold text-5xl text-[#ffffff]">
          Nutrition
        </Text>
        <Text className="mt-20 mb-5 text-3xl text-[#606368]">Calories</Text>
        <View className="bg-[#1E1E1E] py-5 pl-3 flex-row ">
          <View className="mr-3 w-32 h-32">
            <ProgressChart
              data={[calories / 2000]}
              width={132}
              hideLegend={true}
              height={132}
              radius={46}
              chartConfig={{
                backgroundGradientFrom: '#1E1E1E',
                backgroundGradientTo: '#1E1E1E',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(187, 134, 252, ${opacity})`,
              }}
            />
          </View>
          <View className="mt-5">
            <View className="flex-row justify-between">
              <Text className=" text-xl text-[#606368]">Goal: </Text>
              <Text className=" text-xl text-[#bb86fc]">2000 Cal</Text>
            </View>
            <View className="flex-row border-b-2 border-[#03dac6] pt-1 justify-between">
              <Text className=" text-xl text-[#606368]">Actual: </Text>
              <Text className=" text-xl text-[#bb86fc] justify-end ">
                {calories} Cal
              </Text>
            </View>
            <View className="flex-row pt-1 justify-between pt-5 ">
              <Text className=" text-xl text-[#606368]">Remaining: </Text>
              <Text className=" text-xl text-[#bb86fc] ">
                {2000 - calories} Cal
              </Text>
            </View>
          </View>
        </View>
        <Text className="mt-20 mb-5 text-3xl text-[#606368]">Macros</Text>
        <View className="bg-[#1E1E1E] p-5 flex-row ">
          <View className="mr-5 w-24 h-32 flex justify-center items-center ">
            <Text className="mb-1 text-[#bb86fc]">Protein</Text>
            <ProgressChart
              data={[calories / 2000]}
              width={92}
              hideLegend={true}
              height={96}
              radius={32}
              chartConfig={{
                backgroundGradientFrom: '#1E1E1E',
                backgroundGradientTo: '#1E1E1E',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(187, 134, 252, ${opacity})`,
              }}
            />
            <Text className=" mb-1 text-[#bb86fc]">{protein}/200 g</Text>
          </View>
          <View className="mr-5 w-24 h-32 flex justify-center items-center ">
            <Text className=" mb-1 text-[#03dac6]">Carbs</Text>
            <ProgressChart
              data={[calories / 2000]}
              width={92}
              hideLegend={true}
              height={96}
              radius={32}
              chartConfig={{
                backgroundGradientFrom: '#1E1E1E',
                backgroundGradientTo: '#1E1E1E',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(3, 218, 198, ${opacity})`,
              }}
            />
            <Text className=" mb-1 text-[#03dac6]">{carbs}/200 g</Text>
          </View>
          <View className="mr-5 w-24 h-32 flex justify-center items-center ">
            <Text className=" mb-1 text-[#cf6679]">Fat</Text>
            <ProgressChart
              data={[calories / 2000]}
              width={92}
              hideLegend={true}
              height={96}
              radius={32}
              chartConfig={{
                backgroundGradientFrom: '#1E1E1E',
                backgroundGradientTo: '#1E1E1E',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(207, 102, 121, ${opacity})`,
              }}
            />
            <Text className=" mb-1 text-[#cf6679]">{fat}/200 g</Text>
          </View>
        </View>
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
            <View>
              {addBrstate && (
                <MealForm mealType={'breakfast'} user={userContext.UserUID} />
              )}
            </View>
          </View>
          <MealData
            day={today}
            mealType={'breakfast'}
            user={userContext.UserUID}
          />
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
            <View>
              {addLnState && (
                <MealForm mealType={'lunch'} user={userContext.UserUID} />
              )}
            </View>
          </View>
          <MealData day={today} mealType={'lunch'} user={userContext.UserUID} />
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
            <View>
              {addDnState && (
                <MealForm mealType={'dinner'} user={userContext.UserUID} />
              )}
            </View>
          </View>
          <MealData
            day={today}
            mealType={'dinner'}
            user={userContext.UserUID}
          />
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
            <View>
              {addSnState && (
                <MealForm mealType={'snacks'} user={userContext.UserUID} />
              )}
            </View>
          </View>
          <MealData
            day={today}
            mealType={'snacks'}
            user={userContext.UserUID}
          />
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
