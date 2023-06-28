import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import React, {Component, useContext, useEffect, useState} from 'react';
import WorkoutData from './WorkoutData';
import {collection, onSnapshot} from '@firebase/firestore';
import {db} from '../firebaseConfig';
import {FlatList} from 'react-native-gesture-handler';
import WorkoutForm from './WorkoutForm';
import {AuthContext} from '../context/auth';

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

  let today = new Date().toISOString().slice(0, 10);
  return (
    <View style={styles.container}>
      <View style={{marginHorizontal: 10}}>
        <Text style={styles.title}>Verve</Text>
        <Text
          style={{
            marginTop: 40,
            fontWeight: 'bold',
            fontSize: 30,
            color: 'white',
          }}>
          Workouts
        </Text>
        <Text style={{fontSize: 30, color: '#606368'}}>Today's progress</Text>
        <View style={styles.mealCard}>
          {workoutGoal.map(workout => {
            let status;
            if (workout.completed) {
              status = '☒';
            } else {
              status = '☐';
            }
            return (
              <Text style={{fontSize: 20, color: '#BB86FC'}} key={workout.id}>
                {workout.name} {status}
              </Text>
            );
          })}
        </View>
        <WorkoutData day={today} user={userContext.UserUID} />

        <WorkoutForm user={userContext.UserUID} />
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