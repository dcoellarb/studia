import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
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
      currentDestinatario: '',
      showDestinatarios: true,
      destinatarios: []
    }

    this.addDestinarario = this.addDestinarario.bind(this);
    this.destinariosOnBlur = this.destinariosOnBlur.bind(this);
    this.toggleDestinararios = this.toggleDestinararios.bind(this);
    this.handleComentar = this.handleComentar.bind(this);
  }
  
  addDestinarario() {
    this.setState({
      destinatarios: [...this.state.destinatarios, {id: 0, nombre: this.state.currentDestinatario}],
    }, () => {
      this.setState({currentDestinatario: ''})
    });
  }

  toggleDestinararios() {
    this.setState({showDestinatarios: !this.state.showDestinatarios});
  }

  destinariosOnBlur() {
    this.setState({showDestinatarios: false});    
  }

  handleComentar() {

  }

  render() {
    let destinatario = (<View />);
    if (this.state.destinatarios.length > 0) {
      if (this.state.destinatarios.length === 1) {
        destinatario = (
          <Text style={styles.destinatariosText}>{this.state.destinatarios[0].nombre}</Text>
        );
      } else if (this.state.destinatarios.length === 2) {
        destinatario = (
          <View>
            <Text style={styles.destinatariosText}>{this.state.destinatarios[0].nombre}</Text>
            <Text style={styles.destinatariosText}>{this.state.destinatarios[1].nombre}</Text>
          </View>
        );
      } else {
        if (!this.state.showDestinatarios) {
          destinatario = (
            <View>
              <Text style={styles.destinatariosText}>{this.state.destinatarios[0].nombre}</Text>
              <TouchableOpacity onPress={() => this.toggleDestinararios()} style={styles.destinatariosButton}>        
                <Text style={styles.destinatariosButtonText}>+{this.state.destinatarios.length - 1} destinatarios</Text>
              </TouchableOpacity>        
            </View>
            );
        } else {
          destinatario = (
            <View>
              {this.state.destinatarios.map( d => 
                <Text style={styles.destinatariosText}>{d.nombre}</Text>
              )}
            </View>
          );
        }
      }
    }

    let destinatariosData = ["Daniel Coellar","Danilo Arebalo","David Burbano"];
    if (this.state.currentDestinatario !== '') {
      const regex = new RegExp(`${this.state.currentDestinatario.trim()}`, 'i');
      destinatariosData = destinatariosData.filter(d => d.search(regex) >= 0 );
    } else {
      destinatariosData = [];
    }

    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <TextInput placeholder="Asunto" style={{ height: 40 }}/>
          <View>
            {destinatario}
            <View style={{flexDirection: 'row'}}>
              <Autocomplete
                data={destinatariosData}
                defaultValue={this.state.currentDestinatario}
                renderItem={data => (
                  <TouchableOpacity onPress={() =>
                      this.setState({currentDestinatario: data})
                    }
                  >
                    <Text>{data}</Text>
                  </TouchableOpacity>
                )}

                onChangeText={text => this.setState({currentDestinatario: text})}
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
