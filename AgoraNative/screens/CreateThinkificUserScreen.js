import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Animated,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import axios from 'axios';

import {
  Container,
  Item,
  Input
} from 'native-base'

// Load the app logo
const logo = require('../assets/images/agora.png')

export default class CreateThinkificUserScreen extends React.Component {
  state = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    fadeIn: new Animated.Value(0),
    fadeOut: new Animated.Value(0),  
    isHidden: false
  }
  componentDidMount() {
    this.fadeIn()
  }
  fadeIn() {
    Animated.timing(
      this.state.fadeIn,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }
    ).start()
    this.setState({isHidden: true})
  }
  fadeOut() {
    Animated.timing(
      this.state.fadeOut,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }
    ).start()
    this.setState({isHidden: false})
  }
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  // Sign in users with Auth
  createUser() {
    const { firstname, lastname } = this.state
    axios.post('https://api.thinkific.com/api/public/v1/users',
    {
      first_name: firstname,
      last_name: lastname,
      email: this.state.email,
      password: this.state.password,
    })
    .then(function(response){
      console.log(response.data);
    })
    this.props.navigation.navigate('SignIn')
  }
  render() {
    this.state.email = this.props.navigation.getParam('userEmail', 'NO-EMAIL');
    this.state.password = this.props.navigation.getParam('userPassword', 'NO-PASS');
    let { fadeOut, fadeIn, isHidden } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar/>
        <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
          <TouchableWithoutFeedback 
            style={styles.container} 
            onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              {/* App Logo */}
              <View style={styles.logoContainer}>
                {
                  isHidden ?
                  <Animated.Image 
                      source={logo} 
                      style={{ opacity: fadeIn, width: 160, height: 167 }}/>
                  :
                  <Animated.Image 
                      source={logo} 
                      style={{ opacity: fadeOut, width: 120, height: 127 }}/>
                }
              </View>
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  <Item style={styles.itemStyle}>
                    <Ionicons name="ios-person" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder='First name'
                      placeholderTextColor='#adb4bc'
                      returnKeyType='next'
                      autoCapitalize='none'
                      autoCorrect={false}
                      onSubmitEditing={(event) => {this.refs.SecondInput._root.focus()}}
                      onChangeText={value => this.onChangeText('firstname', value)}
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  <Item style={styles.itemStyle}>
                    <Ionicons style={styles.iconStyle} name="ios-person" />
                    <Input
                      style={styles.input}
                      placeholder='Last Name'
                      placeholderTextColor='#adb4bc'
                      returnKeyType='go'
                      autoCapitalize='none'
                      autoCorrect={false}
                      ref='SecondInput'
                      onChangeText={value => this.onChangeText('lastname', value)}
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.createUser()}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              </Container>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f66b1',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 200,
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#1f66b1',
  },
  itemStyle: {
    marginBottom: 20,
  },
  iconStyle: {
    color: '#fff',
    fontSize: 30,
    marginRight: 15
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#1f66b1',
    padding: 14,
    marginBottom: 20,
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#fff",
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 400,
    bottom: 180,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})