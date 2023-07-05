import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import {collection, onSnapshot} from '@firebase/firestore';
import {db} from '../../firebaseConfig';

const TodayChart = ({data}) => {
  const screenWidth = Dimensions.get('window').width;
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

  switch (data.name) {
    case 'calories':
      requiredData = requirement.calories;
      break;
    case 'carbs':
      requiredData = requirement.carbs;
      break;
    case 'protein':
      requiredData = requirement.protein;
      break;
    case 'fat':
      requiredData = requirement.fat;
      break;

    default:
      break;
  }

  return (
    <ProgressChart
      data={[data.infoFor / requiredData]}
      width={data.chartSize}
      hideLegend={true}
      height={data.chartSize}
      radius={data.radius}
      strokeWidth={data.width}
      chartConfig={{
        backgroundGradientFrom: '#1E1E1E',
        backgroundGradientTo: '#1E1E1E',
        decimalPlaces: 2,
        color: (opacity = 1) => `${data.color}, ${opacity})`,
      }}
    />
  );
};

export default TodayChart;
