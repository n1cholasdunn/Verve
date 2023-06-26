import {Text, View, FlatList} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '../../firebaseConfig';

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
    <View style={{marginTop: 20}}>
      <Text>Name: {item.name}</Text>
      <Text>Muscle: {item.muscle}</Text>
      <Text>Reps: {item.reps}</Text>
      <Text>Sets: {item.sets}</Text>
      <Text>weight: {item.weight}lbs</Text>
    </View>
  );

  return (
    <View>
      <Text>Dashboard</Text>
      <FlatList
        data={workouts}
        renderItem={renderWorkouts}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Dashboard;
