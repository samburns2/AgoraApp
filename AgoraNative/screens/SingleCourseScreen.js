import React from 'react';
import axios from 'axios';
import {ScrollView, Text, Button } from 'react-native';

export default class SingleCourseScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('courseName', 'Undefined Course')
    }
  };

  state = {
    data: {},
    ID: {},
    gotCourse: false
}

  getCourse = () =>{
    var self = this;
    return axios.get("https://api.thinkific.com/api/public/v1/courses/"+this.state.ID)
    .then(function(response){
        //console.log(response.data);
        self.setState({data: response.data});
    })
}

  render() {
    this.state.ID = this.props.navigation.getParam('courseID', 'NO-ID');

    if (!this.state.gotCourse){
      this.getCourse();
      this.state.gotCourse = true;
  }
  var course = this.state.data;
  console.log(course);

      return (
        <ScrollView>
          <Button
            //onPress={onPressDiscussions}
            title="Discussions"
            color="#1f66b1"
            accessibilityLabel="Discussions button"
          />
         
          <Button
            //onPress={onPressCollaborations}
            title="Collaborations"
            color="#1f66b1"
            accessibilityLabel="Collaborations button"
          />
          
          <Button
            //onPress={onPressFiles}
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