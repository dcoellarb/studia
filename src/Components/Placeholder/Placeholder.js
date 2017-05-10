import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { globalColors } from './../../styles/globals';

class Placeholder extends Component {
  render() {
    return (
  		<View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
  		  <Icon name='grid-off' size={50} color={globalColors.secondary} />
  		  <Text style={{color: 'gray'}}>{this.props.message}</Text>
  		</View>
    );
  }
}

export default Placeholder;
