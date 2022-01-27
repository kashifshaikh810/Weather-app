import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Search from './Search';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Users from './Users';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {height: 50, width: '100%', paddingVertical: 5},
        tabBarLabelStyle: {
          fontSize: 15,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'home') {
            iconName = 'home-city-outline';
          } else if (route.name === 'search') {
            iconName = 'city';
          } else if (route.name === 'users') {
            iconName = 'users';
          }

          return (
            <>
              {iconName === 'users' ? (
                <FontAwesome name={iconName} size={size} color={color} />
              ) : (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              )}
            </>
          );
        },
        tabBarActiveTintColor: '#00aaff',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        initialParams={{city: 'karachi'}}
        name="home"
        component={Home}
      />
      <Tab.Screen name="search" component={Search} />
      <Tab.Screen name="users" component={Users} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
