import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
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
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <TextInput
            placeholder="Ingrese su comentario"
            multiline={true}
            numberOfLines={4}
            style={{ height: 100 }}
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