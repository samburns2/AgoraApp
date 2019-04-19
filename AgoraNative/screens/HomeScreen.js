import React from 'react';
import {ScrollView, StyleSheet, Button} from 'react-native';
import SingleCourse from '../screens/SingleCourseScreen';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});

export default class HomeScreen extends React.Component {
//for loop through the list of enrollments, make a button for each course with course name and course id

  render() {
    return (
      <ScrollView style={styles.container}>
          <Button
            onPress={() => this._showSingleCourse}
            title="Course 1"
            color="#1f66b1"
            accessibilityLabel="Course 1 button"
          />
         
          <Button
            onPress={() => this.props.navigation.navigate('SingleCourse')}
            title="Course 2"
            color="#1f66b1"
            accessibilityLabel="Course 2 button"
          />
          
          <Button
            onPress={() => this.props.navigation.navigate('SingleCourse')}
            title="Course 3"
            color="#1f66b1"
            accessibilityLabel="Course 3 button"
          />

          <Button
            onPress={() => this.props.navigation.navigate('SingleCourse')}
            title="Course 4"
            color="#1f66b1"
            accessibilityLabel="Course 4 button"
          />
        </ScrollView>
    );
  }
}

_showSingleCourse = () =>{
  this.props.navigation.navigate('SingleCourse')
};
