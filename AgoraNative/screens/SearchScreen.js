import React from 'react';
import axios from 'axios';
import {Image, TextInput, StyleSheet, View, Button} from 'react-native';
import { Text, ScrollView, TouchableOpacity } from "react-native";
import { Card, Tile } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
});

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search for New Courses',
  };

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

    console.log(this.state.text.toLowerCase());
    console.log('search done');
    console.log(this.state.searchData);
    courses = this.state.searchData.items;
  }

  state = {
    originalData: {}, //original data; does not get modified
    searchData: {},
    numCourses: {},
    text: '',
    gotCourses: false
  }

  render() {

    if (!this.state.gotCourses){
      this.getCourseList();
      this.state.gotCourses = true;
      courses = this.state.originalData.items;
    }

    if (!courses)
    {
        return <View/>
    }
    
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 50, borderColor: 'gray', padding: 15}}
          placeholder="Try 'yoga for beginners'"
          onChangeText={(text) => this.setState({text})}
        />


        <Button
            onPress={text => this.keywordCheck()}
            title="SEARCH"
            color="#1f66b1"
            accessibilityLabel="Search enter"
        />

        {/* change to for loop */}
            <Card
                title={courses[0].name}
                image={{uri: courses[0].course_card_image_url}}
            >
            <Text style={{marginBottom: 10}}>
                {courses[0].description}
            </Text>
            </Card>

      </View>
    );
  } 
}
