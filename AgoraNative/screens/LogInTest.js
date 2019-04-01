import React from 'react';
import { ActivityIndicator, AsyncStorage, Button,TextInput, StatusBar, StyleSheet, View, Text} from 'react-native';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40}}
          placeholder="Username"
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
        />
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}