/*import React from 'react';

import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import LoginScreen from '../screens/LogInTest';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const AppStack = createStackNavigator({ Home: MainTabNavigator});
const AuthStack = createStackNavigator({ Login: LoginScreen });

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
  App: AppStack,
  Auth: AuthStack,
},
{
  initialRouteName: 'AuthLoading',
}));*/
 
import React from 'react';

import SignInScreen from '../screens/LogInTest';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
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

