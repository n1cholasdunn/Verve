import {Text, TextInput, View, StyleSheet, Pressable} from 'react-native';
import React, {Component, useReducer, useState} from 'react';
import {addDoc, collection} from '@firebase/firestore';
import {db} from '../firebaseConfig';

const WeightForm = ({user}) => {
  // const WeightForm = ({weight, user}) => {
  let today = new Date().toISOString().slice(0, 10);

  const initialFormState = {
    name: '',
    weightHistory: [],
    date: today,
    userId: '',
  };
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const handleTextChange = e => {
    dispatch({
      type: 'HANDLE INPUT TEXT',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  return (
    <View
      style={{
        margin: 10,
        padding: 15,
        height: 600,
        width: 350,
        backgroundColor: '#1E1E1E',
      }}>
      <Text className="text-[#FFFFFF]">Name</Text>
      <TextInput
        style={styles.input}
        placeholder="name"
        value={formState.name}
        onChangeText={e => handleTextChange(e)}
      />
      <Text className="text-[#FFFFFF]">Weight</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={formState.w}
        onChangeText={e => handleTextChange(e)}
      />
      <View style={{alignItems: 'center'}}>
        <Pressable onPress={addWeighIn} style={styles.addButton}>
          <Text style={{fontSize: 20, fontWeight: '600'}}>Log Weigh In</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default WeightForm;

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
});

// type WeightProps = {
//   name: string;
//   weightHistory: number[];
//   date: string;
//   userId: string;
// };

// const [weightData, setWeightData] = useState<WeightProps>({
//   name: '',
//   weightHistory: [],
//   date: '',
//   userId: '',
// });

// function addWeighIn() {
//   const weighInDb = collection(db, 'weighIn-test');
//   addDoc(weighInDb, {
//     name: weightData.name,
//     weight: weightData.weightHistory,
//     date: today,
//     userId: user,
//   });
// }
