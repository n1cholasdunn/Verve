import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {collection, onSnapshot} from '@firebase/firestore';
import {db} from '../firebaseConfig';

const WorkoutData = ({day}) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const workoutQuery = collection(db, 'workout-test');

    onSnapshot(workoutQuery, snapshot => {
      let workoutList = [];
      snapshot.docs.map(doc => workoutList.push({...doc.data(), id: doc.id}));
      workoutList = workoutList.filter(workout => {
        return workout.date === day;
      });
      setWorkouts(workoutList);
      setLoading(false);
    });
  }, []);

  const renderWorkouts = ({item}) => (
    <View className="p-15 mb-10 ml-3 mr-3 h-180 w-300 bg-[#1E1E1E]">
      <Text className="text-2xl text-[#BB86FC]">Name: {item.name}</Text>
      <Text className="text-lg text-[#606368]">Muscle: {item.muscle}</Text>
      <Text className="text-lg text-[#606368]">Reps: {item.reps}</Text>
      <Text className="text-lg text-[#606368]">Sets: {item.sets}</Text>
      <Text className="text-lg text-[#606368]">Weight: {item.weight}lbs</Text>
      <Text className="text-lg text-[#606368]">
        Date: {item.date.toString()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text className="mt-10 text-2xl font-bold">Added Workouts</Text>
          <FlatList
            data={workouts}
            renderItem={renderWorkouts}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutData;
// <FlatList
//   ListHeaderComponent={
//     <>
//       <Text>Workouts </Text>
//     </>
//   }
//   data={workouts}
//   renderItem={renderWorkouts}
//   // horizontal={true}
//   keyExtractor={item => item.id}
//   ListFooterComponent={
//     <>
//       <Text>Footer</Text>
//     </>
//   }
// />;
