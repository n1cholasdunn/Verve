import React, {useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Animated,
  LayoutAnimation,
  View,
} from 'react-native';
import {LineChart, ProgressChart} from 'react-native-chart-kit';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const TestWeightChart = () => {
  const [progressTime, setProgressTime] = useState(0);

  // Define a initial value for chart
  const animationValue = useRef(new Animated.Value(0)).current;

  const chartConfig = {
    backgroundGradientFrom: '#09090b',
    backgroundGradientTo: '#09090b',
    color: (opacity = 1) => `rgba(187, 134, 252, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    style: {
      borderRadius: 16,
    },
  };

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    // Define animation for chart
    Animated.timing(animationValue, {
      toValue: 0.5, // Value to graph
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
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      <ScrollView
        // contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
        className="px-20">
        <ProgressChart
          data={{data: [progressTime]}}
          width={Dimensions.get('window').width - 20}
          height={250}
          strokeWidth={22}
          radius={100}
          chartConfig={chartConfig}
          hideLegend={false}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TestWeightChart;
