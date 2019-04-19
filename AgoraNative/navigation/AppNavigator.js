import React from 'react';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import {StyleSheet} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppStack = createStackNavigator({ Home: MainTabNavigator});

export default createAppContainer(createSwitchNavigator(
  {
    App: AppStack
  }
));