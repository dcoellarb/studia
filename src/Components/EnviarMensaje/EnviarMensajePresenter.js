import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  BackAndroid
} from 'react-native'
import Autocomplete from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from './../../styles/styles';
import { globalColors } from './../../styles/globals';

const stylesObjects = {
  container: Object.assign({}, globalStyles.barMargin, {
    backgroundColor: 'whitesmoke',
    flex: 1
  }),
  section: Object.assign({}, globalStyles.section),
  actionButton: Object.assign({}, globalStyles.actionButton, {
    width: 100,
    marginTop: 10
  }),
  actionButtonText: Object.assign({}, globalStyles.actionButtonText),  
  lightText: {
    fontSize: 8,
    color: globalColors.text,
    marginLeft: 10,
    marginRight: 10
  },
  destinatariosButton: {
    padding: 5,
    backgroundColor: 'gray',
    borderRadius: 3
  },
  destinatariosText: {
    fontSize: 12,
    color: globalStyles.text
  },
  destinatariosButtonText: {
    fontSize: 10,
    color: 'white'
  },
  addButton: Object.assign({}, globalStyles.actionButton, {
    marginTop: 5,
    borderRadius: 3,
    width: 50,
    height: 50
  })
}
const styles = StyleSheet.create(stylesObjects);

class EnviarMensajePresenter extends Component {
  constructor(props){
    super(props);

    this.state = {
      asunto: '',
      text: '',
      currentSearch: '',
      showDestinatarios: true,
      destinatarios: []
    }

    this.addDestinarario = this.addDestinarario.bind(this);
    this.destinariosOnBlur = this.destinariosOnBlur.bind(this);
    this.toggleDestinararios = this.toggleDestinararios.bind(this);
    this.handleComentar = this.handleComentar.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
  }

  handleBack() {
    this.props.navigator.pop();
    return true;
  }

  addDestinarario() {
    this.setState({
      destinatarios: [...this.state.destinatarios, this.state.currentDestinatario],
    }, () => {
      this.setState({
        currentDestinatario: undefined,
        currentSearch: '',
        showDestinatarios: false
      })
      this.props.clearRecipients();
    });
  }

  toggleDestinararios() {
    this.setState({showDestinatarios: !this.state.showDestinatarios});
  }

  destinariosOnBlur() {
    this.setState({showDestinatarios: false});    
  }

  handleComentar() {
    if (this.state.asunto.length === 0) {
      alert('El asunto del mensaje es requirido');
    }
    else if (this.state.text.length === 0) {
      alert('El contenido del mensaje es requerido');
    }
    else if (this.state.destinatarios.length === 0) {
      alert('Necesitar agregar almeno un destinatario');
    } else {
      this.props.createMessage(this.props.selectedEstudiante, this.state.asunto, this.state.destinatarios, this.state.text, this.props.currentUser)
      .then(
        () => this.props.navigator.pop(),
        (err) => {
          alert('No se pudo enviar el mensaje, por favor contactenos')
        }
      )
    }
  }

  render() {
    let destinatario = (<View />);
    if (this.state.destinatarios.length > 0) {
      if (this.state.destinatarios.length === 1) {
        destinatario = (
          <Text style={styles.destinatariosText}>{this.state.destinatarios[0].name}</Text>
        );
      } else if (this.state.destinatarios.length === 2) {
        destinatario = (
          <View>
            <Text style={styles.destinatariosText}>{this.state.destinatarios[0].name}</Text>
            <Text style={styles.destinatariosText}>{this.state.destinatarios[1].name}</Text>
          </View>
        );
      } else {
        if (!this.state.showDestinatarios) {
          destinatario = (
            <View>
              <Text style={styles.destinatariosText}>{this.state.destinatarios[0].name}</Text>
              <TouchableOpacity onPress={() => this.toggleDestinararios()} style={styles.destinatariosButton}>        
                <Text style={styles.destinatariosButtonText}>+{this.state.destinatarios.length - 1} destinatarios</Text>
              </TouchableOpacity>        
            </View>
            );
        } else {
          destinatario = (
            <View>
              {this.state.destinatarios.map( d => 
                <Text style={styles.destinatariosText}>{d.name}</Text>
              )}
            </View>
          );
        }
      }
    }

    let destinatariosData = this.props.recipients;
    /*
    if (this.state.currentDestinatario !== '') {
      const regex = new RegExp(`${this.state.currentDestinatario.trim()}`, 'i');
      destinatariosData = destinatariosData.filter(d => d.search(regex) >= 0 );
    } else {
      destinatariosData = [];
    }
    */

    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <TextInput
            onChangeText={(text) => this.setState({ asunto: text})}
            placeholder="Asunto" style={{ height: 40 }}
          />
          <View>
            {destinatario}
            <View style={{flexDirection: 'row'}}>
              <Autocomplete
                data={destinatariosData}
                defaultValue={this.state.currentDestinatario ? this.state.currentDestinatario.name : ''}
                renderItem={data => (
                  <TouchableOpacity onPress={() =>
                      this.setState({currentDestinatario: data})
                    }
                  >
                    <Text>{data.name}</Text>
                  </TouchableOpacity>
                )}
                onChangeText={text => this.setState({currentSearch: text}, () => {
                  this.props.fetchRecipients(this.props.selectedEstudiante, this.state.currentSearch, this.props.currentUser);
                })}
                onBlur={() => this.destinariosOnBlur()}
                placeholder="Agregar Destinatario"
                style={{height: 40}}                
              />
              <TouchableOpacity onPress={() => this.addDestinarario()} style={styles.addButton}>        
                <Icon name='add' size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <TextInput
            placeholder="Mensaje"
            onChangeText={(text) => this.setState({ text: text})}
            multiline={true}
            numberOfLines={4}
            style={{ height: 100 }}
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 10, marginBottom: 10}}>
          <TouchableOpacity onPress={() => this.handleComentar()} style={styles.actionButton}>        
            <Text style={styles.actionButtonText}>Enviar</Text>
          </TouchableOpacity> 
        </View>
      </View>
    );
  }
}

export default EnviarMensajePresenter;
