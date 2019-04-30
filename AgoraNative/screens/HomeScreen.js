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
        enrollmentData: {},
        totalEnrollments: {},
        courseData: {},
        gotEnrollments: false,
        gotCourseData: false,
        email: '',
    }

    getEnrollments = () => {
      axios.get("https://api.thinkific.com/api/public/v1/enrollments?query%5Bemail%5D=" + this.state.email)
      .then(response => {
        this.setState({enrollmentData: response.data, totalEnrollments: response.data.meta.pagination.total_items})
      })
    }
    
    getCourseInfo = (numEnrollments) => {
      courseIDs = []
      var i;
      for (i = 0; i < numEnrollments; i++)
      {
        courseIDs.push(this.state.enrollmentData.items[i].id)
      }

      for (i = 0; i < numEnrollments; i++)
      {
        console.log(courseIDs[i])
        axios.get("https://api.thinkific.com/api/public/v1/courses/" + '25917443)
        .then(response => {
          console.log(response.data)
        })
      }
    }

    render() {
      this.state.email = this.props.navigation.getParam('email', 'NO-EMAIL');
        if (!this.state.gotEnrollments){
            this.getEnrollments();
            this.state.gotEnrollments = true;
        }
        courses = this.state.enrollmentData.items;

        if (!this.state.gotCourseData && this.state.gotEnrollments)
        {
          this.getCourseInfo(this.state.totalEnrollments);
        }
        if (courses === undefined)
        {
            return <View/>
        }

      return (
        <ScrollView style={{flex: 1}}>
        </ScrollView>
      );
    }
  }