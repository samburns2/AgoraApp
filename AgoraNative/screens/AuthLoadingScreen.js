import React from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native'

// AWS Amplify modular import
import Auth from '@aws-amplify/auth'

export default class AuthLoadingScreen extends React.Component {
  state = {
    userToken: null,
    username: null
  }
  async componentDidMount () {
    await this.loadApp()
  }
  // Get the logged in users and remember them
  loadApp = async () => {
    await Auth.currentAuthenticatedUser()
    .then(user => {
      this.setState({userToken: user.signInUserSession.accessToken.jwtToken, username: user.username})
      this.setState({username: user.username})
    })
    .catch(err => console.log(err))
    if(this.state.userToken)
    {
      this.props.navigation.navigate('Home', {email: this.state.username})
    }
    else
    {
      this.props.navigation.navigate('Auth')
    }
  }
  render() {
    return (
      <View style={styles.container}> 
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#035ffe',
    alignItems: 'center',
    justifyContent: 'center',
  },
})