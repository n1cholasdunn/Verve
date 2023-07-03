import {Text, View} from 'react-native';
import React, {Component} from 'react';
import {ProgressChart} from 'react-native-chart-kit';

const MacroChart = ({macro}) => {
  return (
    <View className=" w-24 h-32 flex justify-center items-center ">
      <Text className={macro.className}>{macro.name}</Text>
      <ProgressChart
        data={[macro.data / 2000]}
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
      <Text className={macro.className}>{macro.data}/200 g</Text>
    </View>
  );
};

export default MacroChart;
