import React from 'react';
import {View, Text} from 'react-native';
import Explore from '../../components/Explore';

const Today = () => {
  return (
    <View>
      <View>
        <Text className="text-2xl font-bold">Today's Stats</Text>
      </View>
      <View>
        <View>
          <Text>Diet</Text>
        </View>
        <View>
          <View>
            <Text>Calories</Text>
            <Text>Macros</Text>
          </View>
          <View>
            <Text>1000/2000 Calories </Text>
            <Text>20/55g</Text>
            <Text>150/300g</Text>
            <Text>30/70g</Text>
          </View>
        </View>
      </View>
      <View>
        <Text className="text-2xl font-bold">Your Progress</Text>
        {/* TODO Weight chart */}
      </View>
      <View>
        <Explore />
      </View>
    </View>
  );
};

export default Today;
