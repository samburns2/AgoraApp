import React from 'react';

import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
  } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default class SignOutScreen extends React.Component {
    static navigationOptions = {
      title: 'AGORA TEACHING APP',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Button title="Sign Out" onPress={this._signOutAsync} />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  
    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };
  }