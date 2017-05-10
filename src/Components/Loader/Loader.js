import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as Progress from 'react-native-progress';

class Loader extends Component {
  render() {
    return (
  		<View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
  		  <Progress.Circle size={30} indeterminate={true} color='gray' />
  		  <Text style={{color: 'gray'}}>Cargando...</Text>
  		</View>
    );
  }
}

export default Loader;
