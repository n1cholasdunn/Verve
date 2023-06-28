import {
  Text,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  Button,
} from 'react-native';
import React, {Component, useContext, useEffect, useState} from 'react';
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '../../firebaseConfig';
import WorkoutForm from '../../components/WorkoutForm';
import MealData from '../../components/MealData';
import WorkoutData from '../../components/WorkoutData';
import MealForm from '../../components/MealForm';
import Nutrition from '../../components/Nutrition';
import Workouts from '../../components/Workouts';
import {AuthContext} from '../../context/auth';

const Dashboard = () => {
  const userContext = useContext(AuthContext);
  // gosam61266@fulwark.com
  return (
    <SafeAreaView className="bg-zinc-950 h-full w-full">
      <ScrollView>
        {/* <View>
          <WorkoutForm />
        </View> */}
        {/* <WorkoutData /> */}

        {/* <View>
          <MealForm mealType={undefined} />
        </View> */}

        {userContext && <Nutrition />}
        {/* {userContext && <Workouts />} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
