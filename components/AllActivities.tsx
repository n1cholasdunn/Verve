import {FlatList, SafeAreaView, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {collection, onSnapshot} from '@firebase/firestore';
import {db} from '../firebaseConfig';
import {Workout} from '../types/workout';
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
