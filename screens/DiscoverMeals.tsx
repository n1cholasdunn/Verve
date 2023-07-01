import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchRandomRecipes} from '../utils/recipeApi';
import {useNavigation} from '@react-navigation/native';
import DiscoverMealInfo from './DiscoverMealInfo';

//We can also display recipes such as high-protein, low-fat, low-cal, vegan.....
const DiscoverMeals = ({navigation}) => {
  const [breakfastRecipes, setBreakfastRecipes] = useState(null);
  const [lunchRecipes, setLunchRecipes] = useState(null);
  const [dinnerRecipes, setDinnerRecipes] = useState(null);
  const [snackRecipes, setSnackRecipes] = useState(null);

  // const navigation = useNavigation();

  useEffect(() => {
    const fetchRandom = async () => {
      const breakfastMeals = await fetchRandomRecipes('breakfast');
      const lunchMeals = await fetchRandomRecipes('lunch');
      const dinnerMeals = await fetchRandomRecipes('dinner');
      const snackMeals = await fetchRandomRecipes('snack');

      try {
        if (breakfastMeals && lunchMeals && dinnerMeals && snackMeals) {
          setBreakfastRecipes(breakfastMeals);
          setLunchRecipes(lunchMeals);
          setDinnerRecipes(dinnerMeals);
          setSnackRecipes(snackMeals);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRandom();
  }, []);

  const renderBreakfast = ({item}) => (
    <View style={styles.mealCard}>
      <Pressable
        onPress={() => {
          navigation.navigate('DiscoverMealInfo', {
            data: item,
          });
        }}>
        <Image
          style={{
            height: 200,
            width: 200,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
          source={{uri: item.recipe.images['SMALL'].url}}
        />
      </Pressable>
      <Text
        numberOfLines={2}
        style={{
          height: 50,
          fontSize: 18,
          color: 'white',
          marginTop: 5,
          marginHorizontal: 5,
        }}>
        {item.recipe.label}
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
        }}>
        <Text style={{fontSize: 15, color: 'gray', marginTop: 20}}>
          {Math.floor(item.recipe.calories / item.recipe.yield)} Cal/serving
        </Text>
        <Text style={{fontSize: 15, color: 'gray', marginTop: 20}}>Save</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <ScrollView nestedScrollEnabled className="pb-[75px]">
        <Text className="text-5xl text-slate-200 pl-2 mt-10">Find recipes</Text>
        <View className="pb-[75px] min-h-full px-[2px]">
          <View className="mt-10">
            <Text className="text-3xl text-slate-200 pl-2 text-[#606368]">
              Breakfast
            </Text>
            {breakfastRecipes && (
              <FlatList
                data={breakfastRecipes.hits}
                renderItem={renderBreakfast}
                horizontal={true}
                keyExtractor={item => item.recipe.uri}
              />
            )}
          </View>

          <View className="mt-10">
            <Text className="text-3xl text-slate-200 pl-2 text-[#606368]">
              Lunch
            </Text>
            {lunchRecipes && (
              <FlatList
                data={lunchRecipes.hits}
                renderItem={renderBreakfast}
                horizontal={true}
                keyExtractor={item => item.recipe.uri}
              />
            )}
          </View>

          <View className="mt-10">
            <Text className="text-3xl text-slate-200 pl-2 text-[#606368]">
              Dinner
            </Text>
            {dinnerRecipes && (
              <FlatList
                data={dinnerRecipes.hits}
                renderItem={renderBreakfast}
                horizontal={true}
                keyExtractor={item => item.recipe.uri}
              />
            )}
          </View>

          <View className="mt-10">
            <Text className="text-3xl text-slate-200 pl-2 text-[#606368]">
              Snacks
            </Text>
            {snackRecipes && (
              <FlatList
                data={snackRecipes.hits}
                renderItem={renderBreakfast}
                horizontal={true}
                keyExtractor={item => item.recipe.uri}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mealCard: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-end',
    margin: 10,
    height: 300,
    width: 200,
    borderRadius: 8,
    backgroundColor: '#1E1E1E',
  },
});

export default DiscoverMeals;
