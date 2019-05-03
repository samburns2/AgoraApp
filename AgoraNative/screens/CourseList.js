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
        this.state.email = this.props.navigation.dangerouslyGetParent().getParam('email', 'NO-EMAIL');
        
        if (this.state.data.items === undefined)
        {
            return <ActivityIndicator size="large" color="#fff" />
        }
        else
        {
            const course = this.state.data.items.map(course => {
                return (
                    <ScrollView style={{flex: 1}} key = {course.id}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SingleCourse', {courseID: course.id, courseName: course.name, userEmail: this.state.email})}>
                        <Card
                            title={course.name}
                            image={{uri: course.course_card_image_url}}
                        >
                            <Text style={{marginBottom: 10}}>
                                {course.description}
                            </Text>
                        </Card>
                    </TouchableOpacity>
                    </ScrollView>
                )
              })
            return (
                <ScrollView style={{flex: 1}}>                   
                    {course}
                </ScrollView>
            );
        }
    }
}