import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
//import AppNavigator from './navigation/AppNavigator';

import axios from 'axios';

const API_KEY = "2db7e349bfa5be794690cfa5ff930713";
const subdomain = "sam-s-school-3912";
const contentType = "application/json";

axios.defaults.headers.common['X-Auth-API-Key'] = API_KEY;
axios.defaults.headers.common['X-Auth-Subdomain'] = subdomain;
axios.defaults.headers.common['Content-Type'] = contentType;


import {TouchableOpacity } from 'react-native'

import { 
  createSwitchNavigator, 
  createStackNavigator ,
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation'

import { Ionicons } from '@expo/vector-icons';

// Auth stack screen imports
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import SignUpScreen from './screens/SignUpScreen'
import SignInScreen from './screens/SignInScreen'
import ForgetPasswordScreen from './screens/ForgetPasswordScreen'

// App stack screen imports
import HomeScreen from './screens/HomeScreen'
import CourseListScreen from './screens/CourseList';
import SearchScreen from './screens/SearchScreen'
import SettingsScreen from './screens/SettingsScreen'
import SingleCourseScreen from './screens/SingleCourseScreen';
import TakeCourseScreen from './screens/TakeCourseScreen';

// Amplify imports and config
import Amplify from '@aws-amplify/core'
import config from './aws-exports'
import CreateThinkificUserScreen from './screens/CreateThinkificUserScreen';
Amplify.configure(config)

// Configurations and options for the AppTabNavigator
const configurations = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-home" />
      )
    }
  },
  Courses: {
    screen: CourseListScreen,
    navigationOptions: {
      tabBarLabel: 'Courses',
      tabBarIcon: ({tintColor}) => (
        <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-list" />
      )
    }
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({tintColor}) => (
        <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-search" />
      )   
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-settings" />
      )
    }
  },
}

const options = {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  navigationOptions: {
    tabBarVisible: true
  },
  tabBarOptions: {
    showLabel: true,
    activeTintColor: '#fff',
    inactiveTintColor: '#fff9',
    style: {
      backgroundColor: '#035ffe',
    },
    labelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 12,
      marginTop:12,
    },
    indicatorStyle: {
      height: 0,
    },
    showIcon: true,
  }
}

// Bottom App tabs
const AppTabNavigator = createMaterialTopTabNavigator(configurations, options)

// Making the common header title dynamic in AppTabNavigator
AppTabNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index]
  let headerTitle = routeName
  return {
    headerTitle,
  }
}

const AppStackNavigator = createStackNavigator({
  Header: {
    screen: AppTabNavigator,
  },
  SingleCourse: {
    screen: SingleCourseScreen
  },
  TakeCourse: {
    screen: TakeCourseScreen
  }
})

// Auth stack
const AuthStackNavigator = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: () => ({
      title: `Welcome to this App`, // for the header screen
      headerBackTitle: 'Back'
    }),
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: () => ({
      title: `Create a new account`,
    }),
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      title: `Log in to your account`,
    }),
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: () => ({
      title: `Create a new password`,
    }),
  },
  CreateThinkificUser: {
    screen: CreateThinkificUserScreen,
    navigationOptions: () => ({
      title: `Enter First and Last Name`,
    }),
  },
})

const AppNav =  createSwitchNavigator({
  Authloading: AuthLoadingScreen,
  Auth: AuthStackNavigator, // the Auth stack
  App: AppStackNavigator, // the App stack
})

const AppContainer = createAppContainer(AppNav);
export default AppContainer;