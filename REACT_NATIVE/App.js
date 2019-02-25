import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import Routes from './Routes.js'
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import "antd/dist/antd.css";
import * as actions from "./store/actions/auth";
import CustomLayout from "./containers/Layout";

class reactTutorialApp extends Component {
   render() {
      return (
         <Routes />
      )
   }
}

class App extends Component {
    componentDidMount() {
      this.props.onTryAutoSignup();
    }
  
    render() {
      return (
        <Router>
          <CustomLayout {...this.props}>
            <BaseRouter />
          </CustomLayout>
        </Router>
      );
    }
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

AppRegistry.registerComponent('App', () => App)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);


