import {collection, onSnapshot} from '@firebase/firestore';
import React, {useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Animated,
  LayoutAnimation,
  View,
  Text,
} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import {db} from '../../firebaseConfig';

const TodayChart = ({dataValues}) => {
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

  switch (dataValues.name) {
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
  const [progressTime, setProgressTime] = useState(0);
  console.log('dataValues', dataValues);
  // Define a initial value for chart
  const animationValue = useRef(new Animated.Value(0)).current;

  const chartConfig = {
    backgroundGradientFrom: '#1E1E1E',
    backgroundGradientTo: '#1E1E1E',
    color: (opacity = 1) => `${dataValues.color}, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromdataValuesset: false, // optional
    style: {
      borderRadius: 16,
    },
  };

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    // Define animation for chart
    Animated.timing(animationValue, {
      toValue: dataValues.infoFor / requiredData, // Value to graph
      //!THE VALUE THE GRAPH IS SET TO^^^^^
      duration: 2500, // Duration for animation
      useNativeDriver: true,
    }).start();

    // Listen the animation variable and update chart variable
    animationValue.addListener(({value}) => {
      console.log('🚀 ~ animationValue.addListener ~ value', value);
      setProgressTime(value);
    });
  }, []);
  return (
    <SafeAreaView className="bg-zinc-950">
      <ProgressChart
        // data={[dataValues.infoFor / 2000]}
        data={{data: [progressTime]}}
        width={dataValues.chartSize}
        hideLegend={true}
        height={dataValues.chartSize}
        radius={dataValues.radius}
        strokeWidth={dataValues.width}
        chartConfig={chartConfig}
      />
    </SafeAreaView>
  );
};
export default TodayChart;
// const TodayChart = ({dataValuesValues}) => {
//   const [progressTime, setProgressTime] = useState(0);

//   // Define a initial value for chart
//   const animationValue = useRef(new Animated.Value(0)).current;

//   const chartConfig = {
//     backgroundGradientFrom: '#1E1E1E',
//     backgroundGradientTo: '#1E1E1E',
//     color: (opacity = 1) => `${dataValuesValues.color}, ${opacity})`,
//     strokeWidth: 2, // optional, default 3
//     barPercentage: 0.5,
//     useShadowColorFromdataValuesset: false, // optional
//     style: {
//       borderRadius: 16,
//     },
//   };

//   useEffect(() => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
//     // Define animation for chart
//     Animated.timing(animationValue, {
//       toValue: dataValuesValues.infoFor / 2000, // Value to graph
//       //!THE VALUE THE GRAPH IS SET TO^^^^^
//       duration: 2500, // Duration for animation
//       useNativeDriver: true,
//     }).start();

//     // Listen the animation variable and update chart variable
//     animationValue.addListener(({value}) => {
//       console.log('🚀 ~ animationValue.addListener ~ value', value);
//       setProgressTime(value);
//     });
//   }, []);
//   return (
//     <SafeAreaView className="bg-zinc-950">
//       <ScrollView
//         contentContainerStyle={{
//           alignItems: 'center',
//           paddingHorizontal: 20,
//         }}
//         className="px-20">
//         <ProgressChart
//           // dataValues={[dataValues.infoFor / 2000]}
//           dataValues={{dataValues: [progressTime]}}
//           width={dataValuesValues.width}
//           hideLegend={true}
//           height={dataValuesValues.chartSize}
//           radius={dataValuesValues.radius}
//           chartConfig={chartConfig}
//           style={{
//             marginVertical: 8,
//             borderRadius: 16,
//           }}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
// export default TodayChart;
// const TodayChart = ({dataValues}) => {
//   return (
//     <ProgressChart
//       data={[dataValues.infoFor / 2000]}
//       width={dataValues.chartSize}
//       hideLegend={true}
//       height={dataValues.chartSize}
//       radius={dataValues.radius}
//       strokeWidth={dataValues.width}
//       chartConfig={{
//         backgroundGradientFrom: '#1E1E1E',
//         backgroundGradientTo: '#1E1E1E',
//         decimalPlaces: 2,
//         color: (opacity = 1) => `${dataValues.color}, ${opacity})`,
//       }}
//     />
//   );
// };
// export default TodayChart;
