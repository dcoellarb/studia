import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
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
  actionButton: Object.assign({}, globalStyles.actionButton, {
    width: Dimensions.get('window').width * 0.8,
    height: 40,
    marginTop: 20
  }),
  actionButtonText: Object.assign({}, globalStyles.actionButtonText),
  alertText: {
    color: globalColors.primary,
    fontSize: 12
  },
}
const styles = StyleSheet.create(stylesObjects);

class TareaDetallePresenter extends Component {
  constructor(props) {
    super(props);

    this.handleCambiarClave = this.handleCambiarClave.bind(this);
  }

  handleCambiarProfile(profile) {
    this.props.cambiarProfile(profile, this.props.currentUser);
  }

  handleCambiarClave() {
    this.props.navigator.push({index: 3, title: 'Cambiar Clave'});    
  }

  handleCerrarSesion() {
    this.props.cerrarSesion();
    this.props.navigator.push({index: 99, title: 'Studia'});    
  }

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.section}>
          <Text>Perfiles</Text>
          {this.props.profiles.map(profile => 
            <TouchableOpacity onPress={() => this.handleCambiarProfile(profile)}>
              <Text style={styles.alertText}>{profile.name}</Text>
            </TouchableOpacity> 
          )}
        </View>
        <TouchableOpacity onPress={() => this.handleCambiarClave()} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Cambiar Clave</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => this.handleCerrarSesion()} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Cerrar Sesion</Text>
        </TouchableOpacity> 
      </View>
    );
  }
}

export default TareaDetallePresenter;

