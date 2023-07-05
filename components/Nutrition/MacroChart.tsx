import {Text, View} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {ProgressChart} from 'react-native-chart-kit';
import {collection, onSnapshot} from '@firebase/firestore';
import {db} from '../../firebaseConfig';

const MacroChart = ({macro}) => {
  const [requirement, setRequirement] = useState({
    calories: 0,
    carbs: 0,
    fat: 0,
    protein: 0,
  });
  useEffect(() => {
    const requirementQuery = collection(db, 'requirement-test');
    onSnapshot(requirementQuery, snapshot => {
      let requirementList = [];
      snapshot.docs.map(doc =>
        requirementList.push({...doc.data(), id: doc.id})
      );

      let recentRequirement = requirementList.slice(-1).pop();
      setRequirement({
        ...recentRequirement,
        calories: recentRequirement.calories,
        carbs: recentRequirement.carbs,
        fat: recentRequirement.fat,
        protein: recentRequirement.protein,
      });
    });
  }, []);

  let requiredData;

  switch (macro.name) {
    case 'Carbs':
      requiredData = requirement.carbs;
      break;
    case 'Protein':
      requiredData = requirement.protein;
      break;
    case 'Fat':
      requiredData = requirement.fat;
      break;

    default:
      break;
  }

  return (
    <View className=" w-24 h-32 flex justify-center items-center ">
      <Text className={macro.className}>{macro.name}</Text>
      <ProgressChart
        data={[macro.data / requiredData]}
        width={92}
        hideLegend={true}
        height={96}
        radius={32}
        chartConfig={{
          backgroundGradientFrom: '#1E1E1E',
          backgroundGradientTo: '#1E1E1E',
          decimalPlaces: 2,
          color: (opacity = 1) => `${macro.color}, ${opacity})`,
        }}
      />
      <Text className={macro.className}>
        {macro.data}/{requiredData} g
      </Text>
    </View>
  );
};

export default MacroChart;
