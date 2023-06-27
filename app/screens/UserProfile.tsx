import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import {UserOutlined} from '@ant-design/icons';
import WorkoutData from '../../components/WorkoutData';
import DailyChart from '../../components/charts/DailyChart';
import OverallChart from '../../components/charts/OverallChart';

const UserProfile = () => {
  return (
    // <View>
    <SafeAreaView>
      <ScrollView nestedScrollEnabled>
        <View className="bg-black h-full w-full">
          <View>
            <View>
              <Text className="text-xl">Goal Progress</Text>
            </View>
            <View>
              {/* TODO render user profile picture */}
              {/* <UserOutlined /> */}
              <Text className="text-xl">Username</Text>
            </View>
            <View>
              <View className=" flex-row flex">
                <DailyChart className="flex" />
                <OverallChart className="flex" />
              </View>
              <View className="">
                {/* TODO Integrate fitness calculator api for goals and progress */}
                <Text>Overall</Text>
                <Text>Total Weight Loss</Text>
                <Text>Daily Activity</Text>
              </View>
              <View className="">
                <Text>Daily</Text>
                <Text>10lb/20lb</Text>
                <Text>5000/10000 Steps</Text>
              </View>
            </View>
          </View>
          <View>
            <Text>Your Activities</Text>
            {/* TODO Render list of USER activites/workouts */}
            {/* TODO uncomment workout data when either new component made or searchable by user and sort by date */}
            {/* <WorkoutData /> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;
