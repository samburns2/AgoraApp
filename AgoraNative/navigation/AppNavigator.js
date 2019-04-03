import React from 'react';
import SignInScreen from '../screens/LogInTest';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SingleCourseScreen from '../screens/SingleCourseScreen';
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

const AppStack = createStackNavigator({ Home: MainTabNavigator, SingleCourse: SingleCourseScreen});
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));