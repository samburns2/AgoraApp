import React from 'react';
import { AsyncStorage, Button,TextInput, StyleSheet, View, Image} from 'react-native';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white'
    },
  });

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'AGORA TEACHING APP',
  };

  render() {
    return (
      <View style={styles.container}>
      <Image source={require('../agora-logo.jpg')}/>
        <TextInput
          style={{height: 50, borderColor: 'gray', padding: 15}}
          placeholder="USERNAME"
          onChangeText={(text) => this.setState({text})}
        />
        <TextInput
          style={{height: 50, borderColor: 'gray', padding: 15}}
          placeholder="PASSWORD"
          onChangeText={(password) => this.setState({password})}
        />
        <Button title="SIGN IN" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}