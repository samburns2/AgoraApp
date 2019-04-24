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

export default class API extends React.Component {
    state = {
        data: {},
        numCourses: {},
        gotCourses: false,
        meta: {}
    }
    
    getCourseList = () =>{
        var self = this;
        return axios.get("https://api.thinkific.com/api/public/v1/courses?page=1&limit=25")
        .then(function(response){
            self.setState({data: response.data});
            self.setState({meta: response.data.meta});
        })
    }
  
    render() {
        if (!this.state.gotCourses){
            this.getCourseList();
            if (this.state.data)
            {
                this.state.gotCourses = true;
            }
        }
        courses = this.state.data.items;
        
        if (!courses)
        {
            return <View/>
        }

    if(this.state.gotCourses)
    {
        for(let i = 0; i < 25; i++)
        {
          return (
            <ScrollView style={{flex: 1}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SingleCourse', {courseID: courses[i].id, courseName: courses[i].name})}>
                    <Card
                        title={courses[i].name}
                        image={{uri: courses[i].course_card_image_url}}
                    >
                        <Text style={{marginBottom: 10}}>
                            {courses[i].description}
                        </Text>
                    </Card>
                </TouchableOpacity>
            </ScrollView>
            );
        }
    }
  }
}