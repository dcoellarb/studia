import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { globalColors } from './../../styles/globals';
import globalStyles from './../../styles/styles';

const stylesObjects = {
  container: Object.assign({}, globalStyles.barMargin, {
    flex: 1,
    marginTop: 60,
    backgroundColor: 'whitesmoke'
  }),
  subContainer: {
    padding: 5,
    backgroundColor: 'whitesmoke',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'    
  },
  menuItem: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'whitesmoke',
    alignItems: 'center'
  },
  menuText: {
    marginLeft: 5,
    color: globalColors.text,
    fontWeight: '100'
  },
  imageStyle: Object.assign({}, globalStyles.roundItem),
  imageSmallStyle: Object.assign({}, globalStyles.roundSmallItem),
  smallText: {
    fontSize: 10
  },
  smallTextBold: {
    fontSize: 10,
    fontWeight: '600'
  },
  actionSmall: Object.assign({}, globalStyles.actionSmallWrapper)
}
const styles = StyleSheet.create(stylesObjects);

class MenuPresenter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEstudiantes: false,
    }

    this.toggleEstudiantes = this.toggleEstudiantes.bind(this);
  }

  toggleEstudiantes() {
    this.setState({
      showEstudiantes: !this.state.showEstudiantes
    })
  }

  render() {
    let menu = (
      <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <TouchableOpacity onPress={() => this.props.selectedMenuChange('Calendario')} style={styles.barAction}>
            <View style={[styles.menuItem, {flexDirection: 'row'}]}>
              <Icon name='event' size={20} color={globalColors.text} />
              <Text style={styles.menuText}>Calendario</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.selectedMenuChange('Calificaciones')} style={styles.barAction}>
            <View style={[styles.menuItem, {flexDirection: 'row'}]}>
              <Icon name='spellcheck' size={20} color={globalColors.text} />
              <Text style={styles.menuText}>Calificaciones</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.selectedMenuChange('Asistencia')} style={styles.barAction}>
            <View style={[styles.menuItem, {flexDirection: 'row'}]}>
              <Icon name='event-busy' size={20} color={globalColors.text} />
              <Text style={styles.menuText}>Asistencia</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.selectedMenuChange('Notificaciones')} style={styles.barAction}>
            <View style={[styles.menuItem, {flexDirection: 'row'}]}>
              <Icon name='notifications' size={20} color={globalColors.text} />
              <Text style={styles.menuText}>Notificaciones</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.selectedMenuChange('Mensajes')} style={styles.barAction}>
            <View style={[styles.menuItem, {flexDirection: 'row'}]}>
              <Icon name='message' size={20} color={globalColors.text} />
              <Text style={styles.menuText}>Mensajes</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.selectedMenuChange('Preferencias')} style={styles.barAction}>
            <View style={[styles.menuItem, {flexDirection: 'row'}]}>
              <Icon name='settings' size={20} color={globalColors.text} />
              <Text style={styles.menuText}>Preferencias</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginBottom: 10}}>
          <Image source={require('./../../assets/images/logoOpenAlliance.png')} />
        </View>
      </ScrollView>
    );
    if (this.state.showEstudiantes) {
      menu = (
        <View>
          {this.props.estudiantes.map(e => 
            <TouchableOpacity onPress={() => this.props.setSelectedEstudiante(e)} style={styles.barAction}>
              <View style={[styles.menuItem, {flexDirection: 'row'}]}>
                <Image style={styles.imageSmallStyle} source={{uri: e.imageUrl}} />
                <Text style={styles.menuText}>{e.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      );
    }

    let estudiante1 = (<View />);
    if (this.props.selectedEstudiante) {
      estudiante1 = (
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.imageStyle} source={{uri:  this.props.selectedEstudiante.imageUrl}} />
          <View style={{marginLeft: 5}}>
            <Text style={styles.smallTextBold} >{this.props.selectedEstudiante.name}</Text>
            <Text style={styles.smallText} >{this.props.selectedEstudiante.email}</Text>
          </View>
        </View>
      );
    }

    let estudiante2 = (<View />);
    if (this.props.estudiantes.length > 0) {
      estudiante2 = (
        <TouchableOpacity onPress={() => this.props.setSelectedEstudiante(this.props.estudiantes[0])}>
          <Image style={[styles.imageSmallStyle, {marginBottom: 5}]} source={{uri: this.props.estudiantes[0].imageUrl}} />
        </TouchableOpacity>
      );
    }    

    let estudiante3 = (<View />);
    if (this.props.estudiantes.length > 1) {
      estudiante3 = (
        <TouchableOpacity onPress={() => this.props.setSelectedEstudiante(this.props.estudiantes[1])}>
          <Image style={[styles.imageSmallStyle, {marginBottom: 5}]} source={{uri: this.props.estudiantes[1].imageUrl}} />
        </TouchableOpacity>
      );
    }    

    let estudiante4 = (<View />);
    if (this.props.estudiantes.length > 2) {
      estudiante4 = (
        <TouchableOpacity onPress={() => this.toggleEstudiantes()} style={styles.actionSmall}>
          <Icon name={this.state.showEstudiantes ? 'arrow-drop-up' : 'arrow-drop-down'} size={20} color="black" />
        </TouchableOpacity>
      );
    }
    
    return (
      <View style={styles.container}>
        <View style={[styles.subContainer, {flexDirection: 'row', justifyContent: 'space-between'}]}>
          {estudiante1}
          <View>
            {estudiante2}
            {estudiante3}
            {estudiante4}
          </View>
        </View>
        {menu}
      </View>
    );
  }
}

export default MenuPresenter;
