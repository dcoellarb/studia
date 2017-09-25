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
  actionButton: Object.assign({}, globalStyles.actionButton, {
    width: Dimensions.get('window').width * 0.8,
    height: 40,
    marginTop: 20
  }),
  actionButtonText: Object.assign({}, globalStyles.actionButtonText),
  actionText: {
    height: 40,
    marginTop: 20
  },
  alertText: {
    color: globalColors.primary,
    fontSize: 10
  }  
}
const styles = StyleSheet.create(stylesObjects);

class CambioClavePresenter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      newPassword: '',
      newConfirmPassword: ''
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
    if (this.state.password.length > 0 && this.state.newPassword.length > 0 && this.state.newConfirmPassword.length > 0) {
      if (this.state.newPassword === this.state.newConfirmPassword) {
        this.props.changePassword(this.state.password, this.state.newPassword, this.props.currentUser)
        .then(
          () => {
            this.props.navigator.push({index: 99, title: 'Studia'});       
          },
          (error) => {
            alert('No se pudo cambiar la clave, por favor contactenos');
          }
        );
      } else {
        alert('las nuevas claves no coinciden');
      }
    }
  }

  handleOlvideClave() {
    this.props.navigator.push({index: 5, title: 'Restaurar Clave'});    
  }

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.section}>
          <TextInput
            value={this.state.password}
            onChange={(event) => this.setState({password: event.nativeEvent.text})}
            secureTextEntry={true}
            placeholder="Clave Actual"
            placeholderTextColor={globalColors.primary}
            underlineColorAndroid={globalColors.primary}
            style={{color: globalColors.primary, height: 40}}
          />
        </View>
        <View style={styles.section}>
          <TextInput
            value={this.state.newPassword}
            onChange={(event) => this.setState({newPassword: event.nativeEvent.text})}
            secureTextEntry={true}
            placeholder="Nueva Clave"
            placeholderTextColor={globalColors.primary}
            underlineColorAndroid={globalColors.primary}
            style={{color: globalColors.primary, height: 40}}
          />
          <TextInput
            value={this.state.newConfirmPassword}
            onChange={(event) => this.setState({newConfirmPassword: event.nativeEvent.text})}
            secureTextEntry={true}
            placeholder="Confirmar nueva clave"
            placeholderTextColor={globalColors.primary}
            underlineColorAndroid={globalColors.primary}
            style={{color: globalColors.primary, height: 40}}
          />
        </View>
        <TouchableOpacity onPress={() => this.handleConfirm()} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>CONFIRMAR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleOlvideClave()} style={styles.actionText}>
          <Text style={styles.alertText}>Olvidé mi clave.</Text>
        </TouchableOpacity>        
      </View>
    );
  }
}

export default CambioClavePresenter;
