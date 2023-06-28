import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchRandomRecipes} from '../utils/recipeApi';

//We can also display recipes such as high-protein, low-fat, low-cal, vegan.....
const DiscoverMeals = () => {
  const [breakfastRecipes, setbreakfastRecipes] = useState(null);

  useEffect(() => {
    const fetchRandom = async () => {
      const meals = await fetchRandomRecipes();

      try {
        if (meals) {
          setbreakfastRecipes(meals);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRandom();
    // console.log('after', breakfastRecipes);
  }, []);

  const renderBreakfast = ({item}) => (
    <View style={styles.mealCard}>
      <Image
        style={{
          height: 200,
          width: 200,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
        source={{uri: item.recipe.images['SMALL'].url}}
      />
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
      <ScrollView nestedScrollEnabled>
        <View className="pb-[75px] min-h-full px-[2px]">
          <View className="mt-10">
            <Text className="text-3xl text-slate-200 pl-2">Breakfast</Text>
            <FlatList
              data={breakfastRecipes.hits}
              renderItem={renderBreakfast}
              horizontal={true}
              // keyExtractor={item => item.uri}
            />
          </View>
          {/* <View className="mt-10">
            <Text className="text-3xl text-slate-200 pl-2">Lunch</Text>
            <FlatList
              data={breakfastRecipes}
              renderItem={renderBreakfast}
              horizontal={true}
              // keyExtractor={item => item.uri}
            />
          </View>
          <View className="mt-10">
            <Text className="text-3xl text-slate-200 pl-2">Dinner</Text>
            <FlatList
              data={breakfastRecipes}
              renderItem={renderBreakfast}
              horizontal={true}
              // keyExtractor={item => item.uri}
            />
          </View>
          <View className="mt-10 ">
            <Text className="text-3xl text-slate-200 pl-2">Snacks</Text>
            <FlatList
              data={breakfastRecipes}
              renderItem={renderBreakfast}
              horizontal={true}
              // keyExtractor={item => item.uri}
            />
          </View> */}
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

// useEffect(() => {
//     const fetchRandom = async () => {
//       const meals = await fetchRandomRecipes();

//       if (meals.ok) {
//         setbreakfastRecipes(meals);
//       } else {
//         console.log('error');
//       }
//     };
//     fetchRandom();
//     console.log('after', breakfastRecipes.hits[0].recipe.uri);
//   }, []);
