import React from 'react';
import {ScrollView, StyleSheet, Button, View, StatusBar, Image, Text, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { Card, Tile } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default class CourseListScreen extends React.Component {
    state = {
        data: {},
        numCourses: {},
        gotCourses: false
    }
    
    getCourseList = () =>{
        var self = this;
        return axios.get("https://api.thinkific.com/api/public/v1/courses?page=1&limit=25")
        .then(function(response){
            //console.log(response.data);
            self.setState({data: response.data});
        })
    }
  
    render() {
        if (!this.state.gotCourses){
            this.getCourseList();
            this.state.gotCourses = true;
        }
        courses = this.state.data.items;
        //console.log(courses);
        
        if (!courses)
        {
            return <View/>
        }

      return (
        <ScrollView style={{flex: 1}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SingleCourse', {courseID: courses[0].id, courseName: courses[0].name})}>
            <Card
                title={courses[0].name}
                image={{uri: courses[0].course_card_image_url}}
            >
            <Text style={{marginBottom: 10}}>
                {courses[0].description}
            </Text>
            </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('SingleCourse', {courseID: courses[1].id, courseName: courses[1].name})}>
            <Card
                title={courses[1].name}
                image={{uri: courses[1].course_card_image_url}}
            >
            <Text style={{marginBottom: 10}}>
                {courses[1].description}
            </Text>
            </Card>
            </TouchableOpacity>
        </ScrollView>
      );
    }
  }