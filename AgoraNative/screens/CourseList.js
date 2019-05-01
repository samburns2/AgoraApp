import React from 'react';
import {ScrollView, StyleSheet, Button, View, StatusBar, Image, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
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
        
        if (this.state.data.items === undefined)
        {
            return <ActivityIndicator size="large" color="#fff" />
        }
        else
        {
            const course = this.state.data.items.map(function(course, i){
                return (
                    <ScrollView style={{flex: 1}} key = {i}>
                        <Card
                            title={course.name}
                            image={{uri: course.course_card_image_url}}
                        > 
                            <Text style={{marginBottom: 10}}>
                                {course.description}
                            </Text>
                        </Card>
                    </ScrollView>
                )
              })
            return (
                <ScrollView style={{flex: 1}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SingleCourse', {courseID: course.id, courseName: course.name})}>
                    {course}
                </TouchableOpacity>
                </ScrollView>
            );
        }
    }
}