import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import {navigationStackList} from './navigationStackList';
import DetailScreen from '../screens/DetailScreen';
import {Alert, Button} from 'react-native';
import FavouriteScreen from '../screens/FavouriteScreen';

const Stack = createNativeStackNavigator<navigationStackList>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
        <Stack.Screen name={'DetailScreen'} component={DetailScreen} />
        <Stack.Screen name={'FavouriteScreen'} component={FavouriteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
