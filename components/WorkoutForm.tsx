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
import React, {useReducer, useState} from 'react';
import {collection, addDoc} from 'firebase/firestore';
import {db} from '../firebaseConfig';
import {Workout} from '../types/workout';
import {formReducer} from '../helpers/formReducer';

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

  const initialFormState = {
    name: '',
    muscle: [],
    reps: 0,
    sets: 0,
    weight: 0,
    date: '',
    userId: '',
  };

  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const handleTextChange = (field, value) => {
    dispatch({
      type: 'HANDLE INPUT TEXT',
      field,
      payload: value,
    });
  };

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
      name: formState.name,
      muscle: formState.muscle,
      reps: formState.reps,
      sets: formState.sets,
      weight: formState.weight,
      date: today,
      completed: false,
      userId: user,
    });
  }

  return (
    <View className="bg-[#121212] mx-1 pb-9">
      <Text className="text-3xl text-slate-200 font-bold mt-3 mb-3">
        Add Workout
      </Text>
      <View className="bg-[#1E1E1E] px-3 pt-3 border rounded-md pb-5">
        <Text className="text-slate-200 pl-2 font-semibold">Name:</Text>
        <TextInput
          className="w-80 h-9 m-2 border p-2 rounded-md text-slate-200 border-slate-200"
          placeholder="name"
          value={formState.name}
          onChangeText={input => handleTextChange('name', input)}
        />
        <View className="px-2">
          <MultiSelect
            data={muscleData}
            placeholderStyle={styles.placeholder}
            inputSearchStyle={styles.search}
            containerStyle={styles.dropdownContainer}
            itemTextStyle={styles.itemText}
            labelField="label"
            valueField="value"
            placeholder="Select muscles"
            activeColor="#bb86fc"
            selectedTextStyle={styles.selectedText}
            searchPlaceholder="Search Here"
            search
            value={formState.muscle}
            onChange={item => handleTextChange('muscle', item)}
          />
        </View>
        <Text className="text-slate-200 pl-2 mt-2 font-semibold">Reps:</Text>
        <Picker
          itemStyle={styles.picker}
          selectedValue={formState.reps}
          onValueChange={input => handleTextChange('reps', input)}>
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
          <Picker.Item label="11" value={11} />
          <Picker.Item label="12" value={12} />
          <Picker.Item label="13" value={13} />
          <Picker.Item label="14" value={14} />
          <Picker.Item label="15" value={15} />
        </Picker>
        <Text className="text-slate-200 pl-2 font-semibold">Sets:</Text>
        <Picker
          itemStyle={styles.picker}
          selectedValue={formState.sets}
          onValueChange={input => handleTextChange('sets', input)}>
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
        <Text className="text-slate-200 pl-2 font-semibold">Weight(lbs):</Text>
        <TextInput
          className="w-81 h-9 m-2 border p-2 rounded-md text-slate-200 border-slate-200"
          keyboardType="numeric"
          placeholder="Enter Weight"
          value={formState.weight !== 0 ? String(formState.weight) : ''}
          onChangeText={value => handleTextChange('weight', +value)}
        />
        <View style={{alignItems: 'center'}}>
          <Pressable
            onPress={addWorkout}
            className="items-center justify-center border border-solid rounded h-10 w-80 bg-[#bb86fc] my-2">
            <Text className="font-semibold text-slate-200 text-xl">
              Add workout
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    color: '#e2e8f0',
  },
  itemContainer: {
    backgroundColor: '#475569',
  },
  selectedText: {
    color: '#020617',
  },
  dropdownContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 8,
  },
  search: {
    color: '#e2e8f0',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 2,
  },
  itemText: {
    color: '#e2e8f0',
  },
  picker: {
    color: '#e2e8f0',
  },
});

export default WorkoutForm;
