import React from 'react';
import axios from 'axios';
import {Alert, View, ScrollView, Text} from 'react-native';
import { Button, Card } from 'react-native-elements';
import { Constants, WebBrowser } from 'expo';


export default class TakeCourseScreen extends React.Component {
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