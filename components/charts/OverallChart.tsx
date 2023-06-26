import React from 'react';
import {View, Text} from 'react-native';

type OverallChartProps = {
  steps: number;
};

const OverallChart = (steps: OverallChartProps) => {
  return (
    <View>
      <Text>OverallChart</Text>
    </View>
  );
};

export default OverallChart;
