import React, { Component } from 'react';
import { AppRegistry, ScrollView, Text, Button } from 'react-native';

export default class CourseModules extends Component {
  render() {
      return (
        <ScrollView>
          <Button
            onPress={onPressDiscussions}
            title="Discussions"
            color="#1f66b1"
            accessibilityLabel="Discussions button"
          />
         
          <Button
            onPress={onPressCollaborations}
            title="Collaborations"
            color="#1f66b1"
            accessibilityLabel="Collaborations button"
          />
          
          <Button
            onPress={onPressFiles}
            title="Files"
            color="#1f66b1"
            accessibilityLabel="Files button"
          />
        </ScrollView>
    );
  }
}


/* tab example
from https://reactnavigation.org/docs/en/tab-based-navigation.html

import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

class DiscussionScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Discussion Content</Text>
      </View>
    );
  }
}

class CollaborationScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Collaboration Content</Text>
      </View>
    );
  }
}

class FileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>File Content</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Discussions: DiscussionScreen,
  Collaborations: CollaborationScreen,
  Files: FileScreen,
});

export default createAppContainer(TabNavigator);
*/