import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import {UserOutlined} from '@ant-design/icons';
import WorkoutData from '../../components/WorkoutData';
import DailyChart from '../../components/charts/DailyChart';

const UserProfile = () => {
  return (
    // <View>
    <SafeAreaView>
      <ScrollView>
        <View>
          <View>
            <Text>Goal Progress</Text>
          </View>
          <View>
            {/* TODO render user profile picture */}
            {/* <UserOutlined /> */}
            <Text>Username</Text>
          </View>
          <View>
            {/* TODO Integrate fitness calculator api for goals and progress */}
            <Text>Overall</Text>
          </View>
          <View>
            <Text>Daily</Text>
          </View>
          <View>
            <Text>Total Weight Loss</Text>
            <DailyChart />
            <Text>10lb/20lb</Text>
          </View>
          <View>
            <Text>Daily Activity</Text>
            <Text>5000/10000 Steps</Text>
          </View>
        </View>
        <View>
          <Text>Your Activities</Text>
          {/* TODO Render list of USER activites/workouts */}
          <WorkoutData />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;
