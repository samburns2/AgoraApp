import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button,} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Your Dashboard',
  };
  

  render() {
    return (
      <ScrollView>
          <Button
            onPress={this._onPressCourse1}
            title="Course 1"
            color="#1f66b1"
            accessibilityLabel="Course 1 button"
          />
         
         <Button
            onPress={this._onPressCourse2}
            title="Course 2"
            color="#1f66b1"
            accessibilityLabel="Course 2 button"
          />
          
          <Button
            onPress={this._onPressCourse3}
            title="Course 3"
            color="#1f66b1"
            accessibilityLabel="Course 3 button"
          />

          <Button
            onPress={this._onPressCourse4}
            title="Course 4"
            color="#1f66b1"
            accessibilityLabel="Course 4 button"
          />
        </ScrollView>
    );
  }
}

_onPressCourse1 = async () => {
  this.props.navigation.navigate('SingleCourseScreen');
};

_onPressCourse2 = async () => {
  this.props.navigation.navigate('SingleCourseScreen');
};

_onPressCourse3 = async () => {
  this.props.navigation.navigate('SingleCourseScreen');
};

_onPressCourse4 = async () => {
  this.props.navigation.navigate('SingleCourseScreen');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
