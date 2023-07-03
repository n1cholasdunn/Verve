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
import {db} from '../firebaseConfig';
import WorkoutForm from '../components/WorkoutForm';
import MealData from '../components/Nutrition/MealData';
import WorkoutData from '../components/WorkoutData';
import MealForm from '../components/Nutrition/MealForm';
import Nutrition from '../components/Nutrition';
import Workouts from '../components/Workouts';

import {AuthContext} from '../context/auth';
import DiscoverMeals from './DiscoverMeals';
import Test from './Test';
import Layout from '../components/Layout';
import {useNavigation} from '@react-navigation/native';

const Dashboard = () => {
  const userContext = useContext(AuthContext);
  // gosam61266@fulwark.com
  return (
    <SafeAreaView className="bg-zinc-950 h-full w-full">
      <ScrollView nestedScrollEnabled>
        <Layout>
          {/* <View>
          <WorkoutForm />
        </View> */}
          {/* <WorkoutData /> */}

          {/* <View>
          <MealForm mealType={undefined} />
        </View> */}

          {userContext && <Nutrition />}
          {/* {userContext && <Workouts />} */}
          {/* <DiscoverMeals /> */}
          {/* <Test /> */}
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
