import React from 'react';
import axios from 'axios';
import {Alert, View, ScrollView, Text} from 'react-native';
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
    courseID: {},
    gotCourse: false,
    chapters: {},
    gotChapters: false,
    email: '',
    userID: {},
    gotUserID: false
}

  getCourse = () =>{
    var self = this;
    return axios.get("https://api.thinkific.com/api/public/v1/courses/" + this.state.ID)
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

getUserID = () => {
  //console.log(this.state.email)
  axios.get("https://api.thinkific.com/api/public/v1/users?query%5Bemail%5D=" + this.state.email)
  .then(response => {
    this.setState({userID: response.data.items[0].id})
  })
  
}

_handleEnroll = async () => {
  var self = this;
  console.log(this.state.courseID)
  console.log(this.state.userID)
  
  for(var i = 0; i < 25; i++)
  {
    Alert.alert(
      'Enrollment',
      'You are enrolled in this course!',
      [
        {text: 'Close', onPress: () => console.warn('Close Pressed')},
      ]
    );
  }
  return axios.post("https://api.thinkific.com/api/public/v1/enrollments/", {
    course_id: this.state.courseID,
    user_id: this.state.userID
  })
  .then(function(response) {
    console.log(response.data)
  })
};

  render() {
    this.state.email = this.props.navigation.getParam('userEmail', 'NO-EMAIL');//works!
    this.state.courseID = this.props.navigation.getParam('courseID', 'NO-COURSEID');
    if (!this.state.gotCourse){
      this.getCourse();
      this.state.gotCourse = true;
    }

    if (this.state.gotCourse && !this.state.gotChapters)
    {
      this.getChapters();
      this.state.gotChapters = true;
    }

    if (this.state.email != 'NO-EMAIL' && !this.state.gotUserID)
    {
      this.getUserID();
      this.state.gotUserID = true
    }


    var courseChapters = this.state.chapters.items;
    var course = this.state.data;

    if (!courseChapters)
    {
      return <View/>
    }

      if (this.state.gotUserID && this.state.gotChapters && this.state.gotCourse)
      {
        //console.log(this.state.courseID)
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
}