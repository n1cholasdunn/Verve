import {Text, TextInput, View, StyleSheet, Pressable} from 'react-native';
import React, {useReducer, useState} from 'react';
import {addDoc, collection} from '@firebase/firestore';
import {db} from '../firebaseConfig';
import {formReducer} from '../helpers/formReducer';
import AnimatedInput from 'react-native-animated-input';

const WeightForm = ({user}) => {
  let today = new Date().toLocaleString().slice(0, 10);
  const [isValid, setIsValid] = useState(true);
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

  const addWeighIn = () => {
    const weighInDb = collection(db, 'weighIn-test');
    addDoc(weighInDb, {
      weight: formState.weight,
      date: today,
      userId: user,
    });
  };

  return (
    <View className="bg-[#1E1E1E] m-3 p-4 w-92 my-4   items-center rounded-md   border">
      <Text className="text-slate-200  font-semibold text-xl self-center">
        Add Weigh In
      </Text>
      {/* <TextInput
        keyboardType="numeric"
        placeholder="Enter Weight"
        value={formState.weight !== 0 ? String(formState.weight) : ''}
        onChangeText={value => handleTextChange('weight', +value)}
        className="h-10 w-72  my-2  p-2 rounded border border-slate-200 text-slate-200"
      /> */}
      <View>
        <AnimatedInput
          placeholder="Enter Weight..."
          valid={isValid}
          onChangeText={value => handleTextChange('weight', +value)}
          value={formState.weight !== 0 ? String(formState.weight) : ''}
          styleInput={{color: '#e2e8f0', padding: 0.5}}
          errorText="Please enter a valid weight."
          styleLabel={{fontWeight: '600'}}
        />
        <Pressable
          onPress={addWeighIn}
          className="items-center justify-center border border-solid rounded-full h-14 w-72 bg-[#bb86fc] my-2">
          <Text className="font-semibold text-slate-200 text-xl">
            Log Weigh In
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    shadowColor: '#c0c0c0',
    shadowOpacity: 0.9,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowRadius: 8,
    elevation: 6,
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    marginTop: 100,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6a1b9a',
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: 20,
    marginTop: 20,
    shadowColor: '#6a1b9a',
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bodyContent: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    color: '#e2e8f0',
  },
  textInput: {
    // borderWidth: 1,
    // borderColor: '#e2e8f0',
    color: '#e2e8f0',
    height: 36,
    width: 72,
  },
});

export default WeightForm;
