import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from './../../styles/styles';
import { globalColors } from './../../styles/globals';

const stylesObjects = {
  container: Object.assign({}, globalStyles.barMargin, {
    alignItems: 'center'
  }),
  section: Object.assign({}, globalStyles.section, {
    width: Dimensions.get('window').width * 0.8
  }),
  lightText: {
    color: globalColors.textLight,
    fontSize: 10
  },
  actionButton: Object.assign({}, globalStyles.actionButton, {
    width: Dimensions.get('window').width * 0.8,
    height: 40,
    marginTop: 20
  }),
  actionButtonText: Object.assign({}, globalStyles.actionButtonText) 
}
const styles = StyleSheet.create(stylesObjects);

class OlvidoClavePresenter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      newPassword: '',
      newConfirmPassword: ''
    }

    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleConfirm() {
  }

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.section}>
          <Text style={styles.lightText}>
            Por favor ingrese su email para recuperar su clave.
          </Text>
          <TextInput
            value={this.state.password}
            placeholder="Ingrese su email."
            placeholderTextColor={globalColors.primary}
            underlineColorAndroid={globalColors.primary}
            style={{color: globalColors.primary, height: 40}}
          />
        </View>
        <TouchableOpacity onPress={() => this.handleConfirm()} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>CONFIRMAR</Text>
        </TouchableOpacity>       
      </View>
    );
  }
}

export default OlvidoClavePresenter;
