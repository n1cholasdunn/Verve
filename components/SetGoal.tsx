import {Pressable, Text, TextInput, View} from 'react-native';
import React, {Component, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {fetchFitnessInfo} from '../utils/fitnessCalculatorApi';
import {db} from '../firebaseConfig';
import {addDoc, collection} from '@firebase/firestore';

const SetGoal = ({user}) => {
  const [userInfo, setUserInfo] = useState({
    age: '',
    gender: '',
    weight: '',
    height: '',
    activityLevel: '',
    goal: '',
  });

  const fetchInfo = async () => {
    console.log('userInfo', userInfo);
    const nutritionInfo = await fetchFitnessInfo(
      userInfo.age,
      userInfo.gender,
      userInfo.weight,
      userInfo.height,
      userInfo.activityLevel,
      userInfo.goal
    );
    const requirementDb = collection(db, 'requirement-test');

    addDoc(requirementDb, {
      calories: Math.floor(nutritionInfo.data.calorie),
      carbs: Math.floor(nutritionInfo.data.balanced.carbs),
      fat: Math.floor(nutritionInfo.data.balanced.fat),
      protein: Math.floor(nutritionInfo.data.balanced.protein),
      userId: user.userUID,
    });
  };

  return (
    <View className="my-2.5 px-4 py-10 h-fit bg-[#1E1E1E] rounded">
      <Text className="text-slate-200 pl-2 font-semibold">Age:</Text>
      <TextInput
        className="w-81 h-9 m-2 border p-2 rounded-md text-slate-200 border-slate-200"
        keyboardType="numeric"
        placeholder="Enter age..."
        value={userInfo.age !== '' ? String(userInfo.age) : ''}
        onChangeText={value => setUserInfo({...userInfo, age: value})}
      />
      <Text className="text-[#FFFFFF]">Gender</Text>
      <Picker
        style={{color: '#bb86fc'}}
        selectedValue={userInfo.gender}
        onValueChange={input => setUserInfo({...userInfo, gender: input})}>
        <Picker.Item label="Female" value={'female'} />
        <Picker.Item label="Male" value={'male'} />
      </Picker>
      <Text className="text-slate-200 pl-2 font-semibold">Weight(Kg):</Text>
      <TextInput
        className="w-81 h-9 m-2 border p-2 rounded-md text-slate-200 border-slate-200"
        keyboardType="numeric"
        placeholder="Enter weight..."
        value={userInfo.weight !== '' ? String(userInfo.weight) : ''}
        onChangeText={value => setUserInfo({...userInfo, weight: value})}
      />
      <Text className="text-slate-200 pl-2 font-semibold">Height(cm):</Text>
      <TextInput
        className="w-81 h-9 m-2 border p-2 rounded-md text-slate-200 border-slate-200"
        keyboardType="numeric"
        placeholder="Enter height..."
        value={userInfo.height !== '' ? String(userInfo.height) : ''}
        onChangeText={value => setUserInfo({...userInfo, height: value})}
      />
      <Text className="text-slate-200 pl-2 font-semibold">
        Exercise frequency:
      </Text>
      <Picker
        style={{color: '#bb86fc'}}
        selectedValue={userInfo.activityLevel}
        onValueChange={input =>
          setUserInfo({...userInfo, activityLevel: input})
        }>
        <Picker.Item label="None" value={2} />
        <Picker.Item label="1-3 times/week" value={3} />
        <Picker.Item label="4-5 times/week" value={4} />
        <Picker.Item label="Daily exercise" value={5} />
        <Picker.Item label="Intense daily/physical job" value={6} />
      </Picker>

      <Text className="text-slate-200 pl-2 font-semibold">Fitness goal:</Text>
      <Picker
        style={{color: '#bb86fc'}}
        selectedValue={userInfo.goal}
        onValueChange={input => setUserInfo({...userInfo, goal: input})}>
        <Picker.Item label="Maintain" value={'maintain'} />
        <Picker.Item label="Weight loss" value={'weightlose'} />
        <Picker.Item label="Weight gain" value={'weightgain'} />
      </Picker>
      <View style={{alignItems: 'center'}}>
        <Pressable
          onPress={fetchInfo}
          className="h-16 w-[300px] border rounded-full bg-[#BB86FC] flex items-center justify-center">
          <Text style={{fontSize: 20, fontWeight: '600'}}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SetGoal;
