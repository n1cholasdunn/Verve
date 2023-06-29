import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';
import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {collection, addDoc} from 'firebase/firestore';
import {db} from '../firebaseConfig';
import {Workout} from '../types/workout';

const WorkoutForm = ({user}) => {
  let today = new Date().toISOString().slice(0, 10);
  const [workout, setWorkout] = useState<Workout>({
    name: '',
    muscle: [],
    reps: 0,
    sets: 0,
    weight: 0,
    date: '',
    userId: '',
  });

  const muscleData = [
    {label: 'Abdominals', value: 'abdominals'},
    {label: 'Abductors', value: 'abductors'},
    {label: 'Adductors', value: 'adductors'},
    {label: 'Biceps', value: 'biceps'},
    {label: 'Calves', value: 'calves'},
    {label: 'Chest', value: 'chest'},
    {label: 'Forearms', value: 'forearms'},
    {label: 'Glutes', value: 'glutes'},
    {label: 'Hamstrings', value: 'hamstrings'},
    {label: 'Lats', value: 'lats'},
    {label: 'Lower back', value: 'lower_back'},
    {label: 'Neck', value: 'neck'},
    {label: 'Obliques', value: 'obliques'},
    {label: 'Upper back', value: 'upper_back'},
    {label: 'Quadriceps', value: 'quadriceps'},
    {label: 'Traps', value: 'traps'},
    {label: 'Triceps', value: 'triceps'},
  ];

  function addWorkout() {
    const workoutDb = collection(db, 'workout-test');
    addDoc(workoutDb, {
      name: workout.name,
      muscle: workout.muscle,
      reps: workout.reps,
      sets: workout.sets,
      weight: workout.weight,
      date: today,
      completed: false,
      userId: user,
    });
  }
  return (
    <View style={{flex: 1, backgroundColor: '#121212', paddingBottom: 30}}>
      <Text
        style={{
          marginTop: 20,
          fontWeight: 'bold',
          fontSize: 30,
          color: 'white',
        }}>
        Add Workout
      </Text>
      <View
        style={{
          backgroundColor: '#1E1E1E',
          marginHorizontal: 10,
          paddingBottom: 20,
        }}>
        <Text style={styles.text}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="name"
          value={workout.name}
          onChangeText={input => {
            setWorkout({...workout, name: input});
          }}
        />
        <MultiSelect
          data={muscleData}
          labelField="label"
          valueField="value"
          placeholder="Select muscles"
          search
          placeholderStyle={styles.text}
          value={workout.muscle}
          onChange={(item: string[]) => {
            setWorkout({...workout, muscle: item});
          }}
        />
        <Text style={styles.text}>Reps:</Text>
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
        <Text style={styles.text}>Sets:</Text>
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
        <Text style={styles.text}>Weight(lbs):</Text>
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
    color: 'white',
    borderColor: 'white',
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
  text: {
    color: 'white',
  },
});

export default WorkoutForm;
