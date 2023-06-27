import {Text, View, StyleSheet} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import WorkoutData from '../../components/WorkoutData';
import {collection, onSnapshot} from '@firebase/firestore';
import {db} from '../../firebaseConfig';
import {FlatList} from 'react-native-gesture-handler';

const Workouts = () => {
  const [workoutGoal, setWorkoutGoal] = useState([]);
  const [loading, setLoading] = useState(false);

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
        return workout.date === today;
      });
      setWorkoutGoal(todaysWorkouts);
      setLoading(false);
    });
  }, []);

  const renderGoals = ({item}) => (
    <View className="p-15 m-10 h-170 w-300 bg-[#1E1E1E]">
      <Text style={{fontSize: 20, color: '#BB86FC'}}>{item.name}</Text>
    </View>
  );

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
              status = 'completed';
            } else {
              status = 'not completed';
            }
            return (
              <Text style={{fontSize: 20, color: '#BB86FC'}}>
                {workout.name} {status}
              </Text>
            );
          })}
        </View>
        <WorkoutData day={today} />
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
