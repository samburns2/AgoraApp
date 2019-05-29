import React from 'react';
import axios from 'axios';
import {Alert, View, ScrollView, Text, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import { WebBrowser } from 'expo';

const style = StyleSheet.create({
  take: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 25,
    marginTop: 20,
  },
  push: {
    marginTop: 10,
  },
});

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
    userID: {}
}

  getCourse = () =>{
    var self = this;
    axios.get("https://api.thinkific.com/api/public/v1/courses/" + this.state.ID)
    .then(function(response){
        self.setState({data: response.data});

    })
}

getChapters = () => {
  var self = this;
  axios.get("https://api.thinkific.com/api/public/v1/chapters/1826624/contents?page=1&limit=25")
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
  axios.get("https://api.thinkific.com/api/public/v1/users?query%5Bemail%5D=" + this.state.email)
  .then(response => {
    this.setState({userID: response.data.items[0].id})
  })
  
}

_handleEnroll = async () => {
  this.state.email = this.props.navigation.getParam('userEmail', 'NO-EMAIL');
  Alert.alert(
    'Enrollment',
    'You are enrolled in this course!',
    [
      {text: 'Close'},
    ]
  );
  
   axios.post('https://api.thinkific.com/api/public/v1/enrollments/', 
   {
     course_id: this.state.courseID,
     user_id: this.state.userID
    })
   .then(function(response) {
  })
};

  render() {
    if (!this.state.gotCourse)
    {
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

    if (!courseChapters)
    {
      return <View/>
    }

    if (this.state.gotUserID && this.state.gotChapters && this.state.gotCourse)
      {
        return (
          <ScrollView>
            <Text style = {style.take}>Want to enroll in this course?</Text>
            <Button 
              style ={style.push}
              title="Enroll"
              onPress = {this._handleEnroll}
              type="solid"
              raised={true} 
              accessibilityLabel="enroll in class by pressing this button"
            />
   
            <Text style = {style.take}>Want to take this course?</Text>
            <Button
              style ={style.push}
              title="Open Course"
              type = "solid"
              raised={true} 
              onPress={this._handlePressButtonAsync}
              accessibilityLabel="open course web browser by pressing this button"
            />
              <Text>{this.state.result && JSON.stringify(this.state.result)}</Text>
          </ScrollView>
        );
      }
    }
}