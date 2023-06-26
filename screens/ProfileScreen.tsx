import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';
import {UserOutlined} from '@ant-design/icons';

const ProfileScreen = () => {
  return (
    // <View>
    <SafeAreaView>
      <View>
        <View>
          <Text>Goal Progress</Text>
        </View>
        <View>
          {/* TODO render user profile picture */}
          <UserOutlined />
          <Text>Username</Text>
        </View>
        <View>
          <Text>Overall</Text>
        </View>
        <View>
          <Text>Daily</Text>
        </View>
        <View>
          <Text>Total Weight Loss</Text>
          <Text>10lb/20lb</Text>
        </View>
        <View>
          <Text>Daily Activity</Text>
          <Text>5000/10000 Steps</Text>
        </View>
      </View>
      <View>
        <Text>Your Activities</Text>
        {/* TODO Render list of activites/workouts */}
        <View>LIST OF ACTIVITES</View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
