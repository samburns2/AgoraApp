import React from 'react';
import {Image, TextInput, StyleSheet, View, Button} from 'react-native';

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

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 50, borderColor: 'gray', padding: 15}}
          placeholder="Try 'yoga for beginners'"
          onChangeText={(text) => this.setState({text})}
        />
        <Button
            onPress={() => navigate()}
            title="SEARCH"
            color="#1f66b1"
            accessibilityLabel="Search enter"
          />
        </View>
    )
    } 
}
