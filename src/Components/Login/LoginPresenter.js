import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native'
import globalStyles from './../../styles/styles';
import { globalColors } from './../../styles/globals';

const stylesObjects = {
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
    alignItems: 'center'
  },
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
  },
  inputs: {
    color: globalColors.primary,
    height: 60,
    marginRight: 20,
    marginLeft: 20
  } 
}
const styles = StyleSheet.create(stylesObjects);

class LoginPresenter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.props.login(this.state.username, this.state.password)
    .then(
      ()=> {
        this.props.navigator.push({index: 0, title: 'Studia'});
      },
      (error)=> {
        if (error.code === 401 || error.code === 403) {
          alert("Email o clave incorrectos.");
        } else {
          alert("Tenemos problemas en nuestros servidores por favor contactenos");
        }
      }
    )
  }

  handleOlvideClave() {
    this.props.navigator.push({index: 5, title: 'Restaurar Clave'});    
  }

  render() {
    const props = Object.assign({}, this.props);
    return (
      <View style={styles.container}>
        <Image source={require('./../../assets/images/logoOpenAlliance.png')} />
        <TextInput
          value={this.state.username}
          onChange={(event) => this.setState({username: event.nativeEvent.text})}
          width={Dimensions.get('window').width * 0.8}
          placeholder="Email"
          placeholderTextColor={globalColors.primary}
          underlineColorAndroid={globalColors.primary}
          style={styles.inputs}
        />
        <TextInput
          value={this.state.password}
          onChange={(event) => this.setState({password: event.nativeEvent.text})}
          secureTextEntry={true}
          width={Dimensions.get('window').width * 0.8}
          placeholder="Clave"
          placeholderTextColor={globalColors.primary}
          underlineColorAndroid={globalColors.primary}
          style={styles.inputs}
        />
        <TouchableOpacity onPress={() => this.handleLogin()} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>INGRESAR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleOlvideClave()} style={styles.actionText}>
          <Text style={styles.alertText}>Olvidé mi clave.</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginPresenter;
