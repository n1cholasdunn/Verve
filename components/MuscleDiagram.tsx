import {Text, View, Image} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {collection, onSnapshot} from '@firebase/firestore';
import {db} from '../firebaseConfig';

const MuscleDiagram = ({day, user}) => {
  const [muscles, setMuscles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const workoutQuery = collection(db, 'workout-test');

    onSnapshot(workoutQuery, snapshot => {
      let workoutList = [];
      snapshot.docs.map(doc => workoutList.push({...doc.data(), id: doc.id}));
      workoutList = workoutList.filter(workout => {
        return workout.date === day && workout.userId === user;
      });

      workoutList.map(workout => {
        setMuscles(current => [...current, workout.muscle]);
      });
      setMuscles(current => current.flat(Infinity));
      setMuscles(current => [...new Set(current)]);
      setLoading(false);

      console.log(muscles);
    });
    // setMuscles([]) //use for now to clear the muscles
  }, []);

  const imageList = {
    abdominals: require('../media/abdominals.png'),
    abductors: require('../media/abductors.png'),
    adductors: require('../media/adductors.png'),
    biceps: require('../media/biceps.png'),
    calves: require('../media/calves.png'),
    chest: require('../media/chest.png'),
    forearms: require('../media/forearms.png'),
    glutes: require('../media/glutes.png'),
    hamstrings: require('../media/hamstrings.png'),
    lats: require('../media/lats.png'),
    lower_back: require('../media/lower_back.png'),
    neck: require('../media/neck.png'),
    obliques: require('../media/obliques.png'),
    quadriceps: require('../media/quadriceps.png'),
    shoulders: require('../media/shoulders.png'),
    traps: require('../media/traps.png'),
    triceps: require('../media/triceps.png'),
    upper_back: require('../media/upper_back.png'),
  };

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        borderColor: '#03dac5',
        borderWidth: 2,
        borderRadius: 5,
      }}>
      <Image
        style={{
          height: 350,
          width: 350,
          top: 0,
          left: 0,
          position: 'relative',
        }}
        source={require('../media/nothing.png')}
      />

      {muscles.map(muscle => (
        <Image
          style={{
            height: 350,
            width: 350,
            top: 0,
            left: 0,
            position: 'absolute',
          }}
          //   source={require(`../media/${muscle}.png`)}
          source={imageList[muscle]}
        />
      ))}
    </View>
  );
};

export default MuscleDiagram;
