import React from 'react';
import {View, Text} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const DailyChart = () => {
  const screenWidth = Dimensions.get('window').width;
  return (
    <ProgressChart
      data={[0.8]}
      width={Dimensions.get('window').width / 2}
      height={220}
      chartConfig={{
        backgroundGradientFrom: '#09090b',
        backgroundGradientTo: '#09090b',

        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(187, 134, 252, ${opacity})`,
      }}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default DailyChart;
