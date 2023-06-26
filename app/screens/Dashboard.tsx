import {
  Text,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  Button,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '../../firebaseConfig';
import WorkoutForm from '../../components/WorkoutForm';
import MealData from '../../components/MealData';
import WorkoutData from '../../components/WorkoutData';
import MealForm from '../../components/MealForm';
import Nutrition from './Nutrition';

const Dashboard = () => {
  // gosam61266@fulwark.com
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <WorkoutForm />
        </View>
        <WorkoutData />

        <View>
          <MealForm />
        </View>
        {/* <MealData /> */}
        {/* <Nutrition /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
