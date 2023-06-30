import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {deleteDoc, doc} from '@firebase/firestore';
import {AntDesign} from '@expo/vector-icons';
import {db} from '../firebaseConfig';

const RenderWorkouts = ({item}) => {
  const handleDelete = async workout => {
    try {
      await deleteDoc(doc(db, 'workout-test', workout));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="p-5 mb-10 ml-3 mr-3 h-180 w-300 bg-[#1E1E1E] border rounded-md flex-row">
      <View>
        <Text className="text-2xl text-[#BB86FC]">{item.name}</Text>
        <Text className="text-lg text-[#606368]">
          Muscle: {item.muscle.join(' ')}
        </Text>
        <Text className="text-lg text-[#606368]">Reps: {item.reps}</Text>
        <Text className="text-lg text-[#606368]">Sets: {item.sets}</Text>
        <Text className="text-lg text-[#606368]">Weight: {item.weight}lbs</Text>
        <Text className="text-lg text-[#606368]">
          Date: {item.date.toString()}
        </Text>
      </View>
      <View className="ml-[135px]">
        <Pressable onPress={() => handleDelete(item.id)}>
          <AntDesign name="delete" size={24} color="#606368" />
        </Pressable>
      </View>
    </View>
  );
};

export default RenderWorkouts;
