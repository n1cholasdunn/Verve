import {FlatList, SafeAreaView, ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {collection, onSnapshot} from '@firebase/firestore';
import {db} from '../firebaseConfig';
import {Workout} from '../types/workout';
import RenderWorkouts from './RenderWorkouts';

const WorkoutData = ({day, user}) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const workoutQuery = collection(db, 'workout-test');

    onSnapshot(workoutQuery, snapshot => {
      let workoutList = [];
      snapshot.docs.map(doc => workoutList.push({...doc.data(), id: doc.id}));
      workoutList = workoutList.filter(workout => {
        workout.userId === user;
      });
      setWorkouts(workoutList);
      setLoading(false);
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <FlatList
            data={workouts}
            renderItem={RenderWorkouts}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutData;
// const renderWorkouts = ({item}) => (
//   <View className="p-5 mb-10 ml-3 mr-3 h-180 w-300 bg-[#1E1E1E] border rounded-md flex-row">
//     <View>
//       <Text className="text-2xl text-[#BB86FC]">{item.name}</Text>
//       <Text className="text-lg text-[#606368]">Muscle: {item.muscle}</Text>
//       <Text className="text-lg text-[#606368]">Reps: {item.reps}</Text>
//       <Text className="text-lg text-[#606368]">Sets: {item.sets}</Text>
//       <Text className="text-lg text-[#606368]">Weight: {item.weight}lbs</Text>
//       <Text className="text-lg text-[#606368]">
//         Date: {item.date.toString()}
//       </Text>
//     </View>
//   </View>
// );
