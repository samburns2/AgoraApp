import React from 'react';
import axios from 'axios';
import {View, ScrollView, Text, Linking} from 'react-native';
import { Button, Card } from 'react-native-elements';
import { Constants, WebBrowser } from 'expo';

export default class SingleCourseScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('courseName', 'Undefined Course')
    }
  };

  state = {
    data: {},
    ID: {},
    gotCourse: false,
    chapters: {},
    gotChapters: false,
}

  getCourse = () =>{
    var self = this;
    return axios.get("https://api.thinkific.com/api/public/v1/courses/"+this.state.ID)
    .then(function(response){
        self.setState({data: response.data});
    })
}

getChapters = () => {
  var self = this;
  return axios.get("https://api.thinkific.com/api/public/v1/chapters/1826624/contents?page=1&limit=25")
  .then(function(response){
    self.setState({chapters: response.data});
  })
}

_handlePressButtonAsync = async () => {
  for(var i = 0; i < 25; i++)
  {
    var url = this.state.chapters.items[i].take_url;
    let result = await WebBrowser.openBrowserAsync(url);
  }
};

_handleEnroll = async () => {
  console.log("enroll:"); //need course id and user id
  var self = this;
  for(var i = 0; i < 25; i++)
  { 
    var course_num = this.state.chapters.items[i].id; //works!
    this.state.email = this.props.navigation.getParam('email', 'NO-EMAIL');
    console.log(this.state.email);
  }
  return axios.get("https://api.thinkific.com/api/public/v1/users?query%5Bemail%5D=cx@email.com")
  return axios.get("https://api.thinkific.com/api/public/v1/enrollments")
  .then(function(response) {
    self.setState({data: response.data});
  })
};

  render() {
    this.state.ID = this.props.navigation.getParam('courseID', 'NO-ID');

    if (!this.state.gotCourse){
      this.getCourse();
      this.state.gotCourse = true;
    }

    if (this.state.gotCourse && !this.state.gotChapters)
    {
      this.getChapters();
      this.state.gotChapters = true;
    }

    var courseChapters = this.state.chapters.items;
    var course = this.state.data;

    if (!courseChapters)
    {
      return <View/>
    }

      return (
        <ScrollView>
            <Card
              title = {courseChapters[0].name}
            >
            <Button 
              title="Enroll"
              onPress = {this._handleEnroll}
              type="solid"
              raised={true} 
            />
            </Card>
          <Button
            title="Open WebBrowser"
            onPress={this._handlePressButtonAsync}
          />
          <Text>{this.state.result && JSON.stringify(this.state.result)}</Text>
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
*/