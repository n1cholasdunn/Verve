import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import {UserOutlined} from '@ant-design/icons';
import WorkoutData from '../components/WorkoutData';
import DailyChart from '../components/charts/DailyChart';
import OverallChart from '../components/charts/OverallChart';

const UserProfile = () => {
  return (
    <SafeAreaView className="bg-zinc-950 h-full w-full">
      <ScrollView nestedScrollEnabled>
        <View>
          <View className="mb-6">
            <View>
              {/* TODO render user profile picture */}
              {/* <UserOutlined /> */}
              <Text className="text-xl font-semibold text-slate-200">
                Username
              </Text>
            </View>
            <View>
              <Text className="text-2xl font-bold text-slate-200 self-center">
                Goal Progress
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-slate-200 ml-16 text-xl font-semibold">
                Overall
              </Text>
              <Text
                className="text-slate-200 mr-16 text-xl font-semibold
              ">
                Daily
              </Text>
            </View>
            <View>
              <View className=" flex-row flex justify-evenly">
                <DailyChart />
                <OverallChart />
              </View>
              <View className="mx-2 flex flex-row justify-between">
                <View className=" ">
                  {/* TODO Integrate fitness calculator api for goals and progress */}
                  <Text className="text-slate-200 text-lg flex self-center">
                    Total Weight Loss
                  </Text>
                  <Text className="text-slate-200 text-lg flex self-center">
                    Daily Activity
                  </Text>
                </View>
                <View className="">
                  <Text className="text-slate-200 text-lg flex self-center">
                    10lb/20lb
                  </Text>
                  <Text className="text-slate-200 text-lg flex self-center">
                    5000/10000 Steps
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text className="text-slate-200  text-2xl font-bold self-center">
              Your Activities
            </Text>
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
