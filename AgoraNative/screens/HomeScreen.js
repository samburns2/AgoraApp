import React from 'react';
import {ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-elements';

export default class EnrollmentDashboard extends React.Component {
    state = {
        enrollmentData: {},
        totalEnrollments: {},
        courseData: [],
        gotEnrollments: false,
        gotCourseData: false,
        email: '',
    }

    getEnrollments = () => {
      axios.get("https://api.thinkific.com/api/public/v1/enrollments?query%5Bemail%5D=" + this.state.email)
      .then(response => {
        this.setState({enrollmentData: response.data, totalEnrollments: response.data.meta.pagination.total_items})
        courseIDs = []
        var i;
        for (i = 0; i < this.state.totalEnrollments; i++)
        {
          courseIDs.push(this.state.enrollmentData.items[i].course_id)
        }
  
        for (i = 0; i < this.state.totalEnrollments; i++)
        {
          axios.get("https://api.thinkific.com/api/public/v1/courses/" + courseIDs[i])
          .then(response => {
            this.state.courseData.push(response.data)
            this.setState(this.state.courseData)
          })
        }
      })
    }

    render() {
      this.state.email = this.props.navigation.dangerouslyGetParent().getParam('email', 'NO-EMAIL');
      const enrollment = this.state.courseData.map(enrollment => {
        return (
          <TouchableOpacity key = {enrollment.id} onPress={() => this.props.navigation.navigate('TakeCourse', {courseID: enrollment.id, courseName: enrollment.name})}>
            <Card
              title={enrollment.name}
              image={{uri: enrollment.course_card_image_url}}
            >   
            </Card>
          </TouchableOpacity>
        )
      })
  
      if (!this.state.gotEnrollments){
          this.getEnrollments();
          this.state.gotEnrollments = true;
      }

      if (this.state.courseData === undefined)
      {
          return <ActivityIndicator size="large" color="#fff" />
      }
      else
      {
        return ( 
          <ScrollView style={{flex: 1}}>     
              {enrollment}
          </ScrollView>
        );
      }
    }
  }