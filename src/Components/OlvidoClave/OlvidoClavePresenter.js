import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  BackAndroid
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
      email: '',
    }

    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
  }

  handleBack() {
    this.props.navigator.pop();
    return true;
  }

  handleConfirm() {
    this.props.forgotPassword(this.state.email, this.props.currentUser)
    .then(
      () => {
        alert('Se envió un correo con las indicaciones para restableser tu contraseña.');
        this.props.navigator.pop();
      },
      (error) => {
        debugger;        
        alert('No se pudo enviar el correo, por favor contactenos');
      }
    )
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
            onChange={(event) => this.setState({email: event.nativeEvent.text})}            
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
