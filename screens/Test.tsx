import {Text, View, Image} from 'react-native';
import React, {Component} from 'react';
import {LeftCircleFilled} from '@ant-design/icons';

const Test = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1E1E1E',
        height: 1000,
        position: 'relative',
      }}>
      <Image
        style={{
          height: 200,
          width: 200,
          top: 0,
          left: 0,
          position: 'relative',
        }}
        source={require('../media/nothing.png')}
      />
      <Image
        style={{
          height: 200,
          width: 200,
          top: 0,
          left: 0,
          position: 'absolute',
        }}
        source={require('../media/chest.png')}
      />
      <Image
        style={{
          height: 200,
          width: 200,
          top: 0,
          left: 0,
          position: 'absolute',
        }}
        source={require('../media/quadriceps.png')}
      />
      <Image
        style={{
          height: 200,
          width: 200,
          top: 0,
          left: 0,
          position: 'absolute',
        }}
        source={require('../media/lats.png')}
      />
    </View>
  );
};

export default Test;
