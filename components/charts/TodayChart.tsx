import React from 'react';
import {View, Text} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const TodayChart = ({data}) => {
  const screenWidth = Dimensions.get('window').width;
  return (
    <ProgressChart
      data={[data.infoFor / 2000]}
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
