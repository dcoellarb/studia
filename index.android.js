import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import * as Progress from 'react-native-progress';
import configureStore from './src/state/store';
import actions from './src/state/actions/actions';
import App from './src/Components/App/AppContainer';

// Initialize store
const store = configureStore({});

export default class Studia extends Component {
  render() {
    return (
      <Provider store={store}>
         <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Studia', () => Studia);
