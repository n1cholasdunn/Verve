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

const TodayChart = ({dataValues}) => {
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
      toValue: dataValues.infoFor, // Value to graph
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
      {/* <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
        className="px-20"> */}
      {/* <ProgressChart
          // dataValues={[dataValues.infoFor / 2000]}
          dataValues={{dataValues: [progressTime]}}
          width={dataValues.width}
          hideLegend={true}
          height={dataValues.chartSize}
          radius={dataValues.radius}
          chartConfig={chartConfig}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        /> */}
      <ProgressChart
        // data={[dataValues.infoFor / 2000]}
        data={{data: [progressTime]}}
        width={dataValues.chartSize}
        hideLegend={true}
        height={dataValues.chartSize}
        radius={dataValues.radius}
        strokeWidth={dataValues.width}
        chartConfig={chartConfig}
        // chartConfig={{
        //   backgroundGradientFrom: '#1E1E1E',
        //   backgroundGradientTo: '#1E1E1E',
        //   decimalPlaces: 2,
        //   color: (opacity = 1) => `${dataValues.color}, ${opacity})`,
        // }}
      />
      {/* </ScrollView> */}
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
