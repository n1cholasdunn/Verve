import {Text, TextInput, View, StyleSheet, Pressable} from 'react-native';
import React, {useReducer} from 'react';
import {addDoc, collection} from '@firebase/firestore';
import {db} from '../firebaseConfig';
import {formReducer} from '../helpers/weightReducer';

const WeightForm = ({user}) => {
  let today = new Date().toISOString().slice(0, 10);

  const initialFormState = {
    weight: 0,
  };

  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const handleTextChange = (field, value) => {
    dispatch({
      type: 'HANDLE INPUT TEXT',
      field,
      payload: value,
    });
  };

  function addWeighIn() {
    const weighInDb = collection(db, 'weighIn-test');
    addDoc(weighInDb, {
      weight: formState.weight,
      date: today,
      userId: user,
    });
  }

  return (
    <View className="bg-[#1E1E1E] m-3 p-4 w-92 my-4   items-center rounded-md   border">
      <Text className="text-slate-200  font-semibold text-xl self-center">
        Add Weigh In
      </Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Enter Weight"
        value={formState.weight !== 0 ? String(formState.weight) : ''}
        onChangeText={value => handleTextChange('weight', +value)}
        className="h-9 w-72  my-2  p-2 rounded border border-slate-200 text-slate-200"
      />
      <View>
        <Pressable
          onPress={addWeighIn}
          className="items-center justify-center border border-solid rounded h-9 w-72 bg-[#bb86fc] my-2">
          <Text className="font-semibold text-slate-200 text-xl">
            Log Weigh In
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default WeightForm;
