import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import UserProfile from '../screens/UserProfile';
import Today from '../screens/Today';
import Ionicons from '@expo/vector-icons/Ionicons';
import Scan from '../screens/Scan';
import DiscoverMealInfo from '../screens/DiscoverMealInfo';
import DiscoverMeals from '../screens/DiscoverMeals';

const Tab = createBottomTabNavigator();

export default function userStack() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'UserProfile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Your Day') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Scan') {
            iconName = focused ? 'barcode' : 'barcode-outline';
          } else if (route.name === 'DiscoverMeals') {
            iconName = focused ? 'fast-food' : 'fast-food-outline';
          } else if (route.name === 'DiscoverMealInfo') {
            iconName = focused
              ? 'information-circle'
              : 'information-circle-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {position: 'absolute', backgroundColor: '#09090b'},

        tabBarActiveTintColor: '#01DBC6',
        tabBarInactiveTintColor: '#606368',
      })}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Dashboard',
          headerStyle: {
            backgroundColor: '#09090b',
          },
          headerTintColor: '#e2e8f0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="Your Day"
        component={Today}
        options={{
          title: 'Your Day',
          headerStyle: {
            backgroundColor: '#09090b',
          },
          headerTintColor: '#e2e8f0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="Scan"
        component={Scan}
        options={{
          title: 'Scan Food',
          headerStyle: {
            backgroundColor: '#09090b',
          },
          headerTintColor: '#e2e8f0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: '#09090b',
          },
          headerTintColor: '#e2e8f0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="DiscoverMeals"
        component={DiscoverMeals}
        options={{
          headerShown: false,
          title: 'Discover Meals',
          headerStyle: {
            backgroundColor: '#09090b',
          },
        }}
      />
      <Tab.Screen
        name="DiscoverMealInfo"
        component={DiscoverMealInfo}
        options={{
          headerShown: false,
          title: 'Meal Info',
          headerStyle: {
            backgroundColor: '#09090b',
          },
        }}
      />
    </Tab.Navigator>
  );
}
