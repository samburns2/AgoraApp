import React from 'react';
import { AsyncStorage, Button,TextInput, StyleSheet, View, Image} from 'react-native';
import axios from 'axios';

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

  state = {
    text: "",
    password: "",
    userList: {},
  }

  findUser = () => {
    var self = this;
    var userID;
    axios.get("https://api.thinkific.com/api/public/v1/users?query%5Bemail%5D="+ this.state.text.toLowerCase())
    .then(function(response){
      // console.log(response.data);
       userID = response.data.items[0].id;
       //self.setState({userList: response.data});
       console.log(userID);
       return axios.get("https://api.thinkific.com/api/public/v1/users/" + userID)
        .then(function(response){
           console.log(response.data);
       })
   })
  }

  _signInAsync = async () => {
    this.findUser();
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
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
        <Button title="SIGN IN" onPress={
          this._signInAsync
          } />
      </View>
    );
  }
}