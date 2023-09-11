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
import Layout from '../components/Layout';
import {Dropdown} from 'react-native-element-dropdown';

//We can also display recipes such as high-protein, low-fat, low-cal, vegan.....
const DiscoverMeals = ({navigation}) => {
  const [breakfastRecipes, setBreakfastRecipes] = useState(null);
  const [lunchRecipes, setLunchRecipes] = useState(null);
  const [dinnerRecipes, setDinnerRecipes] = useState(null);
  const [snackRecipes, setSnackRecipes] = useState(null);
  const [diet, setDiet] = useState('balanced');

  // const navigation = useNavigation();

  useEffect(() => {
    const fetchRandom = async dietType => {
      const breakfastMeals = await fetchRandomRecipes('breakfast', dietType);
      const lunchMeals = await fetchRandomRecipes('lunch', dietType);
      const dinnerMeals = await fetchRandomRecipes('dinner', dietType);
      const snackMeals = await fetchRandomRecipes('snack', dietType);

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
    fetchRandom(diet);
  }, [diet]);

  const dietData = [
    {label: 'Balanced', value: 'balanced'},
    {label: 'High-Fiber', value: 'high-fiber'},
    {label: 'High-Protein', value: 'high-protein'},
    {label: 'Low-Carb', value: 'low-carb'},
    {label: 'Low-Fat', value: 'low-fat'},
    {label: 'Low-Sodium', value: 'low-sodium'},
  ];

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
    <SafeAreaView className="bg-zinc-950 h-full w-full">
      <ScrollView nestedScrollEnabled>
        <Layout>
          <Text className="text-5xl text-slate-200 pl-2 mt-10">
            Find recipes
          </Text>
          <View className="pb-[75px] min-h-full px-[2px]">
            <View className="mt-10">
              <View className="mb-6 border border-[#606368] rounded-full p-2">
                <Dropdown
                  data={dietData}
                  placeholderStyle={styles.placeholder}
                  inputSearchStyle={styles.search}
                  containerStyle={styles.dropdownContainer}
                  itemContainerStyle={styles.itemContainer}
                  itemTextStyle={styles.itemText}
                  selectedTextStyle={styles.selectedText}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Diet"
                  activeColor="#bb86fc"
                  searchPlaceholder="Search..."
                  search={false}
                  value={diet}
                  onChange={item => setDiet(item.value)}
                />
              </View>
              <Text className="text-3xl  pl-2 text-[#606368]">Breakfast</Text>
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
              <Text className="text-3xl  pl-2 text-[#606368]">Lunch</Text>
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
              <Text className="text-3xl  pl-2 text-[#606368]">Dinner</Text>
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
              <Text className="text-3xl  pl-2 text-[#606368]">Snacks</Text>
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
        </Layout>
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
  placeholder: {
    color: '#e2e8f0',
    fontSize: 25,
  },
  itemContainer: {
    borderRadius: 10,
    marginVertical: 4,
  },
  selectedText: {
    color: '#bb86fc',
    fontSize: 25,
  },
  dropdownContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 8,
  },
  search: {
    color: '#e2e8f0',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 2,
  },
  itemText: {
    color: '#e2e8f0',
  },
  selected: {
    borderColor: '#bb86fc',
    borderRadius: 10,
  },
  picker: {
    color: '#bb86fc',
  },
  containerStyle: {
    borderRadius: 10,
  },
});

export default DiscoverMeals;
