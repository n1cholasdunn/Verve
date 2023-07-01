import {Text, View, Image, ScrollView} from 'react-native';
import React, {Component} from 'react';
import {Button, ScreenWidth} from '@rneui/base';
import {PieChart} from 'react-native-chart-kit';
import {SafeAreaView} from 'react-native-safe-area-context';

const DiscoverMealInfo = props => {
  const {data} = props.route.params;

  const nutritionPerServingData = [
    {
      name: 'Fat',
      population: data.recipe.totalNutrients.FAT.quantity * 9,
      color: '#CF6679',
    },
    {
      name: 'Carbs',
      population: data.recipe.totalNutrients.CHOCDF.quantity * 4,
      color: '#bb86fc',
    },
    {
      name: 'Protein',
      population: data.recipe.totalNutrients.PROCNT.quantity * 4,
      color: '#03dac5',
    },
  ];

  return (
    <SafeAreaView>
      <ScrollView nestedScrollEnabled className="pb-[75px] bg-[#121212] ">
        <View>
          <Image
            style={{
              height: 300,
              width: ScreenWidth,
            }}
            source={{uri: data.recipe.images['REGULAR'].url}}
          />
          <View className="mx-5">
            <Text className="text-[#ffffff] text-2xl  font-bold mt-8 text-center  ">
              {data.recipe.label}
            </Text>
            <Text className="text-[#606368] mt-3">
              Serving(s): {data.recipe.yield}
            </Text>
            <View className="flex-row">
              {data.recipe.dietLabels.map(tag => (
                <Text className="text-[#606368] mt-6 mr-3 text-m uppercase">
                  {tag}
                </Text>
              ))}
            </View>
            <Text className="mt-8 text-[#ffffff] text-xl font-medium">
              Nutrition Per Serving
            </Text>
            <View className="mt-8 h-128 flex-row ">
              <PieChart
                data={nutritionPerServingData}
                width={150}
                height={150}
                accessor={'population'}
                backgroundColor={'none'}
                paddingLeft={'25'}
                absolute
                chartConfig={{
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                hasLegend={false}
              />

              <View className="flex-column ml-5">
                <Text className="text-[#ffffff] text-xl font-medium m-2">
                  {(data.recipe.calories / data.recipe.yield).toFixed(0)} Cal
                </Text>
                <Text className="text-[#bb86fc] text-m font-medium m-2">
                  Carbs:{' '}
                  {(
                    data.recipe.totalNutrients.CHOCDF.quantity /
                    data.recipe.yield
                  ).toFixed(1)}{' '}
                  g
                </Text>
                <Text className="text-[#03dac5] text-m font-medium m-2">
                  Protein:{' '}
                  {(
                    data.recipe.totalNutrients.PROCNT.quantity /
                    data.recipe.yield
                  ).toFixed(1)}{' '}
                  g
                </Text>
                <Text className="text-[#CF6679] text-m font-medium m-2">
                  Fat:{' '}
                  {(
                    data.recipe.totalNutrients.FAT.quantity / data.recipe.yield
                  ).toFixed(1)}
                  g
                </Text>
              </View>
            </View>
            <View className="mb-24">
              <Text className="mt-8 text-[#ffffff] text-xl font-medium">
                Ingredients
              </Text>
              {data.recipe.ingredientLines.map(ingredients => (
                <Text className="mt-3 text-[#ffffff] text-m font-light ">
                  - {ingredients}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiscoverMealInfo;
