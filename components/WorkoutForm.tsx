import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {collection, addDoc} from 'firebase/firestore';
import {db} from '../firebaseConfig';
const WorkoutForm = () => {
  let today = new Date().toISOString().slice(0, 10);
  const [workout, setWorkout] = useState({
    name: '',
    muscle: '',
    reps: 0,
    sets: 0,
    weight: 0,
    date: '',
  });

  function addWorkout() {
    const workoutDb = collection(db, 'workout-test');
    addDoc(workoutDb, {
      name: workout.name,
      muscle: workout.muscle,
      reps: workout.reps,
      sets: workout.sets,
      weight: workout.weight,
      date: today,
    });
  }
  return (
    <View>
      <Text style={{fontSize: 40, marginBottom: 20}}>Workout Form</Text>
      <View>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="name"
          value={workout.name}
          onChangeText={input => {
            setWorkout({...workout, name: input});
          }}
        />
        <Text>Muscle:</Text>
        <TextInput
          style={styles.input}
          placeholder="muscle"
          value={workout.muscle}
          onChangeText={input => {
            setWorkout({...workout, muscle: input});
          }}
        />
        <Text>Reps:</Text>
        <Picker
          selectedValue={workout.reps}
          onValueChange={input => {
            setWorkout({...workout, reps: input});
          }}>
          <Picker.Item label="1" value={1} />
          <Picker.Item label="2" value={2} />
          <Picker.Item label="3" value={3} />
          <Picker.Item label="4" value={4} />
          <Picker.Item label="5" value={5} />
          <Picker.Item label="6" value={6} />
          <Picker.Item label="7" value={7} />
          <Picker.Item label="8" value={8} />
          <Picker.Item label="9" value={9} />
          <Picker.Item label="10" value={10} />
        </Picker>
        <Text>Sets:</Text>
        <Picker
          selectedValue={workout.sets}
          onValueChange={input => {
            setWorkout({...workout, sets: input});
          }}>
          <Picker.Item label="1" value={1} />
          <Picker.Item label="2" value={2} />
          <Picker.Item label="3" value={3} />
          <Picker.Item label="4" value={4} />
          <Picker.Item label="5" value={5} />
          <Picker.Item label="6" value={6} />
          <Picker.Item label="7" value={7} />
          <Picker.Item label="8" value={8} />
          <Picker.Item label="9" value={9} />
          <Picker.Item label="10" value={10} />
        </Picker>
        <Text>Weight(lbs):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={workout.weight.toString()}
          onChangeText={input => {
            setWorkout({...workout, weight: +input});
          }}
        />
        <View style={{alignItems: 'center'}}>
          <Pressable onPress={addWorkout} style={styles.addButton}>
            <Text style={{fontSize: 20, fontWeight: '600'}}>Add workout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#BB86FC',
    height: 40,
    width: 300,
  },
});

export default WorkoutForm;
