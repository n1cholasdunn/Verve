import {FlatList, SafeAreaView, ScrollView, Text, View} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {collection, onSnapshot} from '@firebase/firestore';
import {db} from '../firebaseConfig';

const WorkoutData = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const workoutQuery = collection(db, 'workout-test');

    onSnapshot(workoutQuery, snapshot => {
      let workoutList = [];
      snapshot.docs.map(doc => workoutList.push({...doc.data(), id: doc.id}));
      setWorkouts(workoutList);
      setLoading(false);
    });
  }, []);

  const renderWorkouts = ({item}) => (
    <View className="mt-4 p-15 ">
      {/* <View style={{marginTop: 20, padding: 15}}> */}
      <Text className="text-lg">Name: {item.name}</Text>
      <Text className="text-lg">Muscle: {item.muscle}</Text>
      <Text className="text-lg">Reps: {item.reps}</Text>
      <Text className="text-lg">Sets: {item.sets}</Text>
      <Text className="text-lg">Weight: {item.weight}lbs</Text>
      <Text className="text-lg">Date: {item.date.toString()}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex items-center">
          <Text className="mt-10 text-2xl font-bold">Added Workouts</Text>
          {/* <ScrollView> */}
          <FlatList
            data={workouts}
            renderItem={renderWorkouts}
            // horizontal={true}
            keyExtractor={item => item.id}
          />
          {/* </ScrollView> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutData;
