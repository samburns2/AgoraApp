import React from 'react';
import axios from 'axios';
import {Image, TextInput, StyleSheet, View} from 'react-native';
import { Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Card, Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
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

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search for New Courses',
  };

  state = {
    originalData: {}, //original data; does not get modified
    searchData: {},
    searchArray: [],
    numCourses: {},
    text: '',
    gotCourses: false,
    searchedCourses: false,
  }

  getCourseList = () =>{
    var self = this;
    return axios.get("https://api.thinkific.com/api/public/v1/courses?page=1&limit=25")
    .then(function(response){
        self.setState({originalData: response.data});
    })
  }

  keywordCheck = () => {
    newData = this.state.originalData.items.filter((item) => String(item.keywords).includes(this.state.text.toLowerCase()));
    this.state.searchData.items = newData;
    this.state.searchArray = this.state.searchData.items
    this.setState({searchedCourses: true})
  }

  render() {

    const result = this.state.searchArray.map(result => {
      return (
        <TouchableOpacity key = {result.id} onPress={() => this.props.navigation.navigate('TakeCourse', {courseID: enrollment.id, courseName: enrollment.name})}>
          <Card
            title={result.name}
            image={{uri: result.course_card_image_url}}
          >   
            <Text style={{marginBottom: 10}}>
              {result.description}
            </Text>
          </Card>
        </TouchableOpacity>
      )
    })
    if (!this.state.gotCourses){
      this.getCourseList();
      this.state.gotCourses = true;
    }

    courses = this.state.originalData.items;

    if (!courses)
    {
        return <ActivityIndicator size="large" color="#fff" />
    }

    if (!this.state.searchedCourses)
    {
      return (
        <View style={{flex: 1}}>
        <Text style = {styles.take}>Want to search for a new course to take?</Text>
          <TextInput
            style={{height: 50, textAlign:'center', padding: 15}}
            placeholder="Try 'math for second graders'"
            onChangeText={(text) => this.setState({text})}
          />
          <Button
            style = {styles.push}
            onPress={text => this.keywordCheck()}
            title="SEARCH"
            color="#1f66b1"
            type = "solid"
            raised={true} 
            accessibilityLabel="search for courses by pressing this button"
        />
        </View>
      );
    }
    
    return (
      <ScrollView style={{flex: 1}}>
          <TextInput
            style={{height: 50, borderColor: 'gray', textAlign:'center', padding: 15}}
            placeholder="Try 'math for second graders'"
            onChangeText={(text) => this.setState({text})}
          />
          <Button
            style = {styles}
            onPress={text => this.keywordCheck()}
            title="SEARCH"
            color="#1f66b1"
            type = "solid"
            raised={true} 
            accessibilityLabel="search for courses by pressing this button"
        />
        {result}
      </ScrollView>
    );
  } 
}