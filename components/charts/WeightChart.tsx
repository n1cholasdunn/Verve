import React from 'react';
import {View, Text} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const WeightChart = () => {
  const screenWidth = Dimensions.get('window').width;
  return (
    <LineChart
      data={{
        //TODO start @ months since first log of weight
        //TODO if months tracked > 12 show jan-dec and cap at that.
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            strokeWidth: 2,
          },
        ],
      }}
      width={screenWidth - 16}
      height={220}
      chartConfig={{
        backgroundGradientFrom: '#09090b',
        backgroundGradientTo: '#09090b',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(187, 134, 252, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      style={{marginVertical: 8, borderRadius: 16}}
    />
  );
};

export default WeightChart;
