import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {Component, useContext, useEffect, useState} from 'react';
import WorkoutData from './WorkoutData';
import {collection, doc, onSnapshot, updateDoc} from '@firebase/firestore';
import {db} from '../firebaseConfig';
import {FlatList} from 'react-native-gesture-handler';
import WorkoutForm from './WorkoutForm';
import {AuthContext} from '../context/auth';
import MuscleDiagram from './MuscleDiagram';
import {AntDesign} from '@expo/vector-icons';

const Workouts = () => {
  const [workoutGoal, setWorkoutGoal] = useState([]);
  const [loading, setLoading] = useState(false);
  const userContext = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    const workoutQuery = collection(db, 'workout-test');

    onSnapshot(workoutQuery, snapshot => {
      let todaysWorkouts = [];
      snapshot.docs.map(doc =>
        todaysWorkouts.push({...doc.data(), id: doc.id})
      );
      todaysWorkouts = todaysWorkouts.filter(workout => {
        let today = new Date().toISOString().slice(0, 10);
        return workout.date === today && workout.userId === userContext.UserUID;
      });
      setWorkoutGoal(todaysWorkouts);
      setLoading(false);
    });
  }, []);

  const toggleComplete = async workout => {
    await updateDoc(doc(db, 'workout-test', workout.id), {
      completed: !workout.completed,
    });
  };

  let today = new Date().toISOString().slice(0, 10);
  return (
    <View style={styles.container}>
      <View className="mx-2 ">
        <Text className="mb-10 mt-20 px-2  font-bold text-5xl text-[#ffffff]">
          Workouts
        </Text>
        <MuscleDiagram day={today} user={userContext.UserUID} />
        <Text className=" mt-20 mb-3 pl-2 text-3xl text-[#606368] font-semibold">
          Today's workouts
        </Text>
        <View className="min-h-[56px] h-auto mx-2 bg-[#1E1E1E] rounded-md border">
          {workoutGoal.map(workout => (
            <View className="flex-row justify-between m-4 ">
              <Text className="text-2xl text-[#BB86FC] " key={workout.id}>
                {workout.name}
              </Text>
              {workout.completed ? (
                <Pressable
                  onPress={() => {
                    toggleComplete(workout);
                  }}>
                  <AntDesign name="checkcircle" size={24} color="#BB86FC" />
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    toggleComplete(workout);
                  }}>
                  <AntDesign name="checkcircleo" size={24} color="#BB86FC" />
                </Pressable>
              )}
            </View>
          ))}
        </View>
        {/* <Text className=" pl-4  mt-20 text-3xl text-[#606368]">
          Add workout
        </Text> */}
        <View className="mt-8">
          <WorkoutData day={today} user={userContext.UserUID} />
          <WorkoutForm user={userContext.UserUID} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    paddingBottom: 20,
  },

  title: {
    marginTop: 50,
    marginBottom: 40,
    color: '#01DBC6',
    fontSize: 80,
    textAlign: 'center',
  },
  text: {
    color: 'white',
  },
  mealType: {marginTop: 20, fontWeight: 'bold', fontSize: 20, color: '#606368'},
  mealCard: {
    margin: 10,
    padding: 15,
    height: 170,
    width: 300,
    backgroundColor: '#1E1E1E',
  },
});

export default Workouts;
