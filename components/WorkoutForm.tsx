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
    {label: 'Shoulders', value: 'shoulders'},
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
    <View className="bg-[#121212] p-2">
      <View className="bg-[#1E1E1E] my-10 p-5 pb-16">
        <Text className="text-[#ffffff] mb-2 font-medium">Name</Text>
        <TextInput
          className="placeholder:italic placeholder-[#ffffff] text-regal-blue border-[#ffffff] h-10 w-300 border rounded-md"
          placeholder=" required..."
          placeholderTextColor={'#8d8f94'}
          value={workout.name}
          onChangeText={input => {
            setWorkout({...workout, name: input});
          }}
        />
        <Text className="text-[#ffffff] mt-16 mb-2 font-medium">Muscles</Text>
        <MultiSelect
          style={{
            borderColor: '#ffffff',
            borderWidth: 1,
            borderRadius: 5,
          }}
          activeColor="#bb86fc"
          itemTextStyle={{color: '#ffffff'}}
          containerStyle={{backgroundColor: '#303030', borderColor: '#303030'}}
          data={muscleData}
          labelField="label"
          valueField="value"
          placeholder=" select muscles..."
          search
          placeholderStyle={{color: '#8d8f94'}}
          value={workout.muscle}
          onChange={(item: string[]) => {
            setWorkout({...workout, muscle: item});
          }}
        />
        <Text className="text-[#ffffff] mt-16 mb-2 font-medium">Reps</Text>
        <Picker
          selectedValue={workout.reps}
          onValueChange={input => {
            setWorkout({...workout, reps: input});
          }}>
          <Picker.Item color="#bb86fc" label="1" value={1} />
          <Picker.Item color="#bb86fc" label="2" value={2} />
          <Picker.Item color="#bb86fc" label="3" value={3} />
          <Picker.Item color="#bb86fc" label="4" value={4} />
          <Picker.Item color="#bb86fc" label="5" value={5} />
          <Picker.Item color="#bb86fc" label="6" value={6} />
          <Picker.Item color="#bb86fc" label="7" value={7} />
          <Picker.Item color="#bb86fc" label="8" value={8} />
          <Picker.Item color="#bb86fc" label="9" value={9} />
          <Picker.Item color="#bb86fc" label="10" value={10} />
        </Picker>
        <Text className="text-[#ffffff] mt-5 mb-2 font-medium">Sets:</Text>
        <Picker
          selectedValue={workout.sets}
          onValueChange={input => {
            setWorkout({...workout, sets: input});
          }}>
          <Picker.Item color="#bb86fc" label="1" value={1} />
          <Picker.Item color="#bb86fc" label="2" value={2} />
          <Picker.Item color="#bb86fc" label="3" value={3} />
          <Picker.Item color="#bb86fc" label="4" value={4} />
          <Picker.Item color="#bb86fc" label="5" value={5} />
          <Picker.Item color="#bb86fc" label="6" value={6} />
          <Picker.Item color="#bb86fc" label="7" value={7} />
          <Picker.Item color="#bb86fc" label="8" value={8} />
          <Picker.Item color="#bb86fc" label="9" value={9} />
          <Picker.Item color="#bb86fc" label="10" value={10} />
        </Picker>
        <Text className="text-[#ffffff] mt-16 mb-2 font-medium">
          Weight(lbs):
        </Text>
        <TextInput
          className="placeholder:italic placeholder-[#ffffff] text-regal-blue border-[#ffffff] h-10 w-300 border rounded-md"
          placeholderTextColor={'#8d8f94'}
          keyboardType="numeric"
          value={workout.weight.toString()}
          onChangeText={input => {
            setWorkout({...workout, weight: +input});
          }}
        />
        <View style={{alignItems: 'center'}}>
          <Pressable
            onPress={addWorkout}
            className="items-center justify-center border bg-[#BB86FC] border-[#BB86FC] h-16 w-64 rounded-full mt-16">
            <Text style={{fontSize: 20, fontWeight: '600'}}>Add workout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {},
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
