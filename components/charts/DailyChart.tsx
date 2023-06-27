import React from 'react';
import {View, Text} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const DailyChart = ({className}) => {
  const screenWidth = Dimensions.get('window').width;
  return (
    <View className="w-1/2">
      <ProgressChart
        data={[0.8]}
        width={Dimensions.get('window').width / 2 - 30}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          // style: {
          //   borderRadius: 16,
          // },
        }}
        // style={{
        //   marginVertical: 8,
        //   borderRadius: 16,
        // }}
        style={className}
      />
    </View>
  );
};

export default DailyChart;
