import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  BackAndroid
} from 'react-native'
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
  }  
}
const styles = StyleSheet.create(stylesObjects);

class ComentarPresenter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comentario: ''
    }

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

  handleComentar(value) {
    if (this.state.comentario.length > 0) {
      if (this.props.type === 'MessageComment') {
        this.props.insertComentarioMessage(this.props.selectedEstudiante, this.props.message, this.state.comentario, this.props.currentUser)
        .then(
          () => {
            this.props.navigator.pop();
          },
          (error) => {
            alert('No se pudo enviar el comentario, por favor contactenos');
          }
        );        
      } else {
        this.props.insertComentarioTarea(this.props.selectedEstudiante, this.props.tarea, this.state.comentario, this.props.currentUser)
        .then(
          () => {
            this.props.navigator.pop();
          },
          (error) => {
            alert('No se pudo enviar el comentario, por favor contactenos');
          }
        );  
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <TextInput
            placeholder="Ingrese su comentario"
            multiline={true}
            numberOfLines={4}
            style={{ height: 100 }}
            value={this.state.comentario}
            onChange={(event) => this.setState({comentario: event.nativeEvent.text})}
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 10, marginBottom: 10}}>
          <Text style={styles.lightText}>
            Recuerde que los comentario de tarea son visibles permanentemente para profesores, estudiantes y representantes.
          </Text>
          <TouchableOpacity onPress={() => this.handleComentar()} style={styles.actionButton}>        
            <Text style={styles.actionButtonText}>Comentar</Text>
          </TouchableOpacity> 
        </View>

      </View>
    );
  }
}

export default ComentarPresenter;