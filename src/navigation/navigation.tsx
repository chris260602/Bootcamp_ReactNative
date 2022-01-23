import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import {navigationStackList} from './navigationStackList';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator<navigationStackList>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
        <Stack.Screen name={'DetailScreen'} component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
