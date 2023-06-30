import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {collection, deleteDoc, doc, onSnapshot} from '@firebase/firestore';
import {db} from '../firebaseConfig';
import {Workout} from '../types/workout';
import {AntDesign} from '@expo/vector-icons';
import RenderWorkouts from './RenderWorkouts';

const AllActivities = ({user}) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const workoutQuery = collection(db, 'workout-test');

    onSnapshot(workoutQuery, snapshot => {
      let workoutList = [];
      snapshot.docs.map(doc => workoutList.push({...doc.data(), id: doc.id}));
      workoutList = workoutList.filter(workout => {
        return workout.userId === user;
      });
      setWorkouts(workoutList);
      setLoading(false);
    });
  }, []);

  // const handleDelete = async workout => {
  //   try {
  //     await deleteDoc(doc(db, 'workout-test', workout));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
  //     <View className="ml-[135px]">
  //       <Pressable onPress={() => handleDelete(item.id)}>
  //         <AntDesign name="delete" size={24} color="#606368" />
  //       </Pressable>
  //     </View>
  //   </View>
  // );

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

export default AllActivities;
