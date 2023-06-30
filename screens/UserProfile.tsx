import {View, Text, SafeAreaView, ScrollView, Pressable} from 'react-native';
import React, {useContext} from 'react';
import DailyChart from '../components/charts/DailyChart';
import OverallChart from '../components/charts/OverallChart';
import {AuthContext} from '../context/auth';
import Layout from '../components/Layout';
import AllActivities from '../components/AllActivities';
import {useColorScheme} from 'nativewind';

const UserProfile = () => {
  const userContext = useContext(AuthContext);
  const {colorScheme, toggleColorScheme} = useColorScheme();

  return (
    <SafeAreaView className="bg-zinc-950 h-full w-full">
      <ScrollView nestedScrollEnabled>
        <Layout>
          <View className="mb-6">
            <View>
              {/* TODO render user profile picture */}
              <Text className="text-lg font-semibold text-slate-200 my-2 pl-2">
                {userContext.email}
              </Text>
              {/* <Pressable
                className="flex-1 items-center justify-center bg-neutral-100 dark:bg-neutral-900"
                onPress={toggleColorScheme}>
                <Text className="text-black dark:text-white">
                  {`Try clicking me! ${colorScheme === 'dark' ? '🌙' : '🌞'}`}
                </Text>
              </Pressable> */}
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
            <Text className="text-slate-200  text-2xl font-bold self-center my-2">
              Your Activities
            </Text>
            <AllActivities user={userContext.UserUID} />
          </View>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;
