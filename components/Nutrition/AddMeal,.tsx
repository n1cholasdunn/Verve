import {Text, TouchableOpacity, View} from 'react-native';
import React, {Component, useState} from 'react';
import MealData from './MealData';
import MealForm from './MealForm';

const AddMeal = ({data}) => {
  let today = new Date().toLocaleString().slice(0, 10);

  const [addState, setAddState] = useState(false);

  return (
    <View>
      <View className="flex-column">
        <View className="flex-row">
          <View className="flex-row flex justify-between items-center px-4 mt-5 h-10 w-[300px] bg-[#1E1E1E]">
            <Text className="font-bold text-[20px] text-[#606368]">
              {data.mealText}
            </Text>
          </View>
          <TouchableOpacity
            className="font-bold text-[20px] text-[#606368] bg-[#1E1E1E] h-10 w-10 flex items-center justify-center mt-5 ml-2.5"
            onPress={() => setAddState(!addState)}>
            <Text className="font-bold text-[20px] text-[#606368]">
              {addState ? '-' : '+'}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {addState && <MealForm mealType={data.mealType} user={data.user} />}
        </View>
      </View>
      <MealData day={today} mealType={data.mealType} user={data.user} />
    </View>
  );
};

export default AddMeal;
