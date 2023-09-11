import {View, Text, SafeAreaView, ScrollView, Pressable} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import DailyChart from '../components/charts/DailyChart';
import OverallChart from '../components/charts/OverallChart';
import {AuthContext} from '../context/auth';
import Layout from '../components/Layout';
import AllActivities from '../components/AllActivities';
import {useColorScheme} from 'nativewind';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import SetGoal from '../components/SetGoal';
import {collection, onSnapshot} from '@firebase/firestore';
import {db} from '../firebaseConfig';

// import {colors} from '../theme/colors';

const UserProfile = () => {
  const userContext = useContext(AuthContext);
  const [requirement, setRequirement] = useState({
    calories: 0,
    carbs: 0,
    fat: 0,
    protein: 0,
  });
  const [clicked, setClicked] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const requirementQuery = collection(db, 'requirement-test');
    onSnapshot(requirementQuery, snapshot => {
      let requirementList = [];
      snapshot.docs.map(doc =>
        requirementList.push({...doc.data(), id: doc.id})
      );
      // requirementList = requirementList.filter(requirement => {
      //   return requirement.userId === userContext.UserUID;
      // });

      let recentRequirement = requirementList.slice(-1).pop();
      setRequirement({
        ...recentRequirement,
        calories: recentRequirement.calories,
        carbs: recentRequirement.carbs,
        fat: recentRequirement.fat,
        protein: recentRequirement.protein,
      });
    });
  }, []);

  return (
    <SafeAreaView className="bg-zinc-950 h-full w-full">
      <ScrollView nestedScrollEnabled>
        <Layout>
          <View className="mb-6">
            <View className="flex-row justify-between py-5 px-1">
              <Text className="text-lg font-semibold text-[#ffffff] ">
                {userContext.email}
              </Text>
              <MaterialCommunityIcons name="logout" size={24} color="white" />
            </View>
            <View>
              <View className="flex-row items-center mb-5">
                <Text className="text-xl font-bold text-slate-200 ">
                  Calories:
                </Text>
                <Text className=" ml-3 text-xl text-[#bb86fc]">
                  {requirement.calories} kcals
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-xl font-bold text-slate-200 ">
                  Carbohydrates:
                </Text>
                <Text className=" ml-3 text-xl text-[#bb86fc]">
                  {requirement.carbs} grams
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-xl font-bold text-slate-200 ">
                  Protein:
                </Text>
                <Text className=" ml-3 text-xl text-[#bb86fc]">
                  {requirement.protein} grams
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-xl font-bold text-slate-200 ">Fat:</Text>
                <Text className=" ml-3 text-xl text-[#bb86fc]">
                  {requirement.fat} grams
                </Text>
              </View>
              <View className="mt-16 flex items-center">
                <Pressable
                  onPress={() => setClicked(!clicked)}
                  className="h-10 w-[200px] border rounded-full bg-[#BB86FC] flex items-center justify-center">
                  <Text style={{fontSize: 20, fontWeight: '600'}}>
                    Change goal
                  </Text>
                </Pressable>
              </View>
              {clicked ? <SetGoal user={userContext} /> : ''}
            </View>
            <View></View>
          </View>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;
