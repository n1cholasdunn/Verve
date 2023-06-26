import {Text, View, FlatList, ScrollView, SafeAreaView} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '../../firebaseConfig';
import WorkoutForm from '../../components/WorkoutForm';

const Dashboard = () => {
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
    <View style={{marginTop: 20, padding: 15}}>
      <Text>Name: {item.name}</Text>
      <Text>Muscle: {item.muscle}</Text>
      <Text>Reps: {item.reps}</Text>
      <Text>Sets: {item.sets}</Text>
      <Text>Weight: {item.weight}lbs</Text>
      <Text>Date: {item.date.toString()}</Text>
    </View>
  );
  // gosam61266@fulwark.com
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <WorkoutForm />
          <Text style={{marginTop: 40, fontWeight: 'bold'}}>
            Added Workouts
          </Text>
        </View>

        <FlatList
          data={workouts}
          renderItem={renderWorkouts}
          horizontal={true}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
