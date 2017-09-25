import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Navigator,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Dimensions
} from 'react-native'
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Login from './../Login/LoginContainer';
import Main from './../Main/MainContainer';
import TareaDetalle from './../TareaDetalle/TareaDetalleContainer';
import EnviarMensaje from './../EnviarMensaje/EnviarMensajeContainer';
import CambioClave from './../CambioClave/CambioClaveContainer';
import Comentar from './../Comentar/ComentarContainer';
import OlvidoClave from './../OlvidoClave/OlvidoClaveContainer';
import StudiaWebView from './../StudiaWebView/StudiaWebView';
import PDFView from './../PDFView/PDFView';
import { globalColors } from './../../styles/globals';

const stylesObjects = {
  bar: {
    backgroundColor: globalColors.primary,
    elevation: 10
  },
  barAction: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center'
  },
  barText: {
    color: globalColors.textInverse,
    fontSize: 20,
    marginTop: 14
  },
  barTextDoubleTop: {
    color: globalColors.textInverse,
    fontSize: 12,
  },
  barTextDoubleBottom: {
    color: globalColors.textInverse,
    fontSize: 9,
    marginTop: 2
  },
  barTextSmall: {
    color: globalColors.textInverse,
    fontSize: 8,
    marginTop: 20
  },
  filtrosText: {
    color: globalColors.textInverse,
    fontSize: 12
  }
}
const styles = StyleSheet.create(stylesObjects);

class AppPresenter extends Component {
  constructor(props) {
      super(props);

      this.state = {
        showSearchNotificaciones: false,
        showSearchMensajes: false,
        showSearchCalenario: false,
        showFiltrosCalendario: false,
        drawerOpen: false,
      }

      this.setDrawerRef = this.setDrawerRef.bind(this);
      this.openDrawer = this.openDrawer.bind(this);
      this.renderScene = this.renderScene.bind(this);
      this.renderBarLeftButton = this.renderBarLeftButton.bind(this);
      this.renderBarRightButton = this.renderBarRightButton.bind(this);
      this.renderTitle = this.renderTitle.bind(this);
      this.toogleSearchNotificaciones = this.toogleSearchNotificaciones.bind(this);
      this.toogleSearchMensajes = this.toogleSearchMensajes.bind(this);
      this.toogleSearchCalendario = this.toogleSearchCalendario.bind(this);
      this.toogleFiltrosCalendario = this.toogleFiltrosCalendario.bind(this);
      this.handleCalendarSearchChange = this.handleCalendarSearchChange.bind(this);
      this.handleNotificacionesSearchChange = this.handleNotificacionesSearchChange.bind(this);
      this.handleMensajesSearchChange = this.handleMensajesSearchChange.bind(this);
      this.handleCalendarioFiltroChange = this.handleCalendarioFiltroChange.bind(this);
  }

  setDrawerRef(openDrawerRef) {
    this.openDrawerRef = openDrawerRef
  }

  openDrawer() {
    if (this.openDrawerRef) {
      if (this.state.drawerOpen) {
        this.setState({ drawerOpen: false }, ( )=> {
          this.openDrawerRef(false);
        });
      } else {
        this.setState({ drawerOpen: true }, ( )=> {
          this.openDrawerRef(true);
        });
      }
    }
  }

  toogleSearchMensajes() {
    this.setState({showSearchMensajes: !this.state.showSearchMensajes}, () => {
      if (!this.state.showSearchMensajes) {
        this.handleMensajesSearchChange('');
      }
    });
  }

  toogleSearchNotificaciones() {
    this.setState({showSearchNotificaciones: !this.state.showSearchNotificaciones}, () => {
      if (!this.state.showSearchNotificaciones) {
        this.handleNotificacionesSearchChange('');
      }      
    });
  }

  toogleSearchCalendario() {
    this.setState({showSearchCalenario: !this.state.showSearchCalenario}, () => {
      if (!this.state.showSearchCalenario) {
        this.handleCalendarSearchChange('');
      }
    });
  }

  toogleFiltrosCalendario() {
    this.setState({showFiltrosCalendario: !this.state.showFiltrosCalendario})
  }

  handleCalendarSearchChange(text) {
    this.props.handleCalendarSearchChange(text);
  }

  handleMensajesSearchChange(text) {
    this.props.handleMensajesSearchChange(text);
  }

  handleNotificacionesSearchChange(text) {
    this.props.handleNotificacionesSearchChange(text);
  }

  handleCalendarioFiltroChange(calendarioFiltro) {
    this.toogleFiltrosCalendario();
    this.props.handleCalendarioFiltroChange(calendarioFiltro);
  }

  renderBarLeftButton(route, navigator, index, navState) {
    switch (route.index) {
      case 0:
        return (
          <TouchableOpacity onPress={this.openDrawer} style={styles.barAction}>
            <Icon name='menu' size={20} color={'white'} />
          </TouchableOpacity>
        );
      case 1: 
        return (
          <TouchableOpacity onPress={() => navigator.pop()} style={styles.barAction}>
            <Icon name='arrow-back' size={20} color={'white'} />
          </TouchableOpacity>
        );
      case 2: 
        return (
          <TouchableOpacity onPress={() => navigator.pop()} style={styles.barAction}>
            <Icon name='arrow-back' size={20} color={'white'} />
          </TouchableOpacity>
        );
      case 3: 
        return (
          <TouchableOpacity onPress={() => navigator.pop()} style={styles.barAction}>
            <Icon name='arrow-back' size={20} color={'white'} />
          </TouchableOpacity>
        );
      case 4: 
        return (
          <TouchableOpacity onPress={() => navigator.pop()} style={styles.barAction}>
            <Icon name='arrow-back' size={20} color={'white'} />
          </TouchableOpacity>
        );
      case 5: 
        return (
          <TouchableOpacity onPress={() => navigator.pop()} style={styles.barAction}>
            <Icon name='arrow-back' size={20} color={'white'} />
          </TouchableOpacity>
        );
      case 100: 
        return (
          <TouchableOpacity onPress={() => navigator.pop()} style={styles.barAction}>
            <Icon name='arrow-back' size={20} color={'white'} />
          </TouchableOpacity>
        );
      case 101: 
        return (
          <TouchableOpacity onPress={() => navigator.pop()} style={styles.barAction}>
            <Icon name='arrow-back' size={20} color={'white'} />
          </TouchableOpacity>
        );
      default: 
        return (<View />);
    }
  }

  renderBarRightButton(route, navigator, index, navState, calendarioFiltro) {
    switch (route.index) {
      case 0:
        let barRight = (<View />);

        if (this.props.currentComponent === 'Calendario') {
          barRight = (
            <View style={{width: 150, flexDirection: 'row'}}>
              <TouchableOpacity onPress={this.toogleSearchCalendario} style={styles.barAction}>
                <Icon name={!this.state.showSearchCalenario ? 'search' : 'close'} size={20} color={'white'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.toogleFiltrosCalendario} style={{marginLeft: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={styles.barTextSmall}>{calendarioFiltro}</Text>
                  <Icon name='arrow-drop-down' size={20} color={'white'} style={{marginTop: 20}} />
                </View>
              </TouchableOpacity>
            </View>
          );                      
        }

        if (this.props.currentComponent === 'Notificaciones') {
          barRight = (
            <TouchableOpacity onPress={this.toogleSearchNotificaciones} style={styles.barAction}>
              <Icon name={!this.state.showSearchNotificaciones ? 'search' : 'close'} size={20} color={'white'} />
            </TouchableOpacity>
          );                      
        }

        if (this.props.currentComponent === 'Mensajes') {
          barRight = (
            <TouchableOpacity onPress={this.toogleSearchMensajes} style={styles.barAction}>
              <Icon name={!this.state.showSearchMensajes ? 'search' : 'close'} size={20} color={'white'} />
            </TouchableOpacity>
          );                      
        }

        return barRight;
      default: 
        return (<View />);
    }
  }  

  renderTitle(route, navigator, index, navState, calendarSearch, handleCalendarSearchChange, notificacionesSearch, handleNotificacionesSearchChange, mensajesSearch, handleMensajesSearchChange) {
    switch (route.index) {
      case 0:
        let barTitle = (<Text style={styles.barText}>{this.props.currentComponent}</Text>);
        if (this.props.currentComponent === 'Calendario') {
          if (!this.state.showSearchCalenario) {
            barTitle = (
              <Text style={styles.barText}>Calendario</Text>
            );                      
          } else {
            barTitle = (
              <TextInput
                width={Dimensions.get('window').width - 240}
                placeholder="Buscar"
                placeholderTextColor="white"
                underlineColorAndroid="white"
                value={calendarSearch}
                onChange={(event) => handleCalendarSearchChange(event.nativeEvent.text)}
                style={{flex: 1, color: 'white', marginLeft: Platform.OS === 'ios' ? 60 : 0}}
              />
            );                      
          }
        }
        if (this.props.currentComponent === 'Notificaciones') {
          if (!this.state.showSearchNotificaciones) {
            barTitle = (
              <Text style={styles.barText}>{this.props.currentComponent}</Text>
            );                      
          } else {
            barTitle = (
              <TextInput
                width={Dimensions.get('window').width - 140}
                placeholder="Buscar"
                placeholderTextColor="white"
                underlineColorAndroid="white"
                value={notificacionesSearch}
                onChange={(event) => handleNotificacionesSearchChange(event.nativeEvent.text)}
                style={{flex: 1, color: 'white', marginLeft: Platform.OS === 'ios' ? 60 : 0}}
              />
            );                      
          }
        }
        if (this.props.currentComponent === 'Mensajes') {
          if (!this.state.showSearchMensajes) {
            barTitle = (
              <Text style={styles.barText}>{this.props.currentComponent}</Text>
            );                      
          } else {
            barTitle = (
              <TextInput
                width={Dimensions.get('window').width - 140}
                placeholder="Buscar"
                placeholderTextColor="white"
                underlineColorAndroid="white"
                value={mensajesSearch}
                onChange={(event) => handleMensajesSearchChange(event.nativeEvent.text)}
                style={{flex: 1, color: 'white', marginLeft: Platform.OS === 'ios' ? 60 : 0}}
              />
            );                      
          }
        }
        return barTitle;
      case 1:
        return (
          <View style={{height: 56, justifyContent: 'center'}}>
            <Text style={styles.barTextDoubleTop}>{route.title}</Text>
            <Text style={styles.barTextDoubleBottom}>{route.subtitle}</Text>
          </View>
        );
      default: 
        return (<Text style={styles.barText}>{route.title}</Text>);
    }    
  }

  renderScene(route, navigator) {
    switch (route.index) {
      case 0:
        return (<Main navigator={navigator} setDrawerRef={this.setDrawerRef} closedDrawer={(open) => this.setState({drawerOpen: open})} />);
      case 1:
        return (<TareaDetalle navigator={navigator} tarea={route.tarea} />);
      case 2:
        return (<EnviarMensaje navigator={navigator} />);
      case 3:
        return (<CambioClave navigator={navigator} />);
      case 4:
        return (<Comentar navigator={navigator} tarea={route.tarea} message={route.message} type={route.type} />);
      case 5:
        return (<OlvidoClave navigator={navigator} />);
      case 99:
        return (<Login navigator={navigator} />);
      case 100:
        return (<StudiaWebView navigator={navigator} url={route.url} userData={route.userData} />);
      case 101:
        return (<PDFView navigator={navigator} url={route.url} userData={route.userData} />);
      default: 
        return (<Main navigator={navigator} setDrawerRef={this.setDrawerRef} />);
    }
  }  

  render() {    
    let screen;

    if (this.props.loading) {
      screen = (
        <View style={{flex: 1, backgroundColor: '#672482', justifyContent: 'center', alignItems: 'center'}}>
          <Progress.Circle size={30} indeterminate={true} color='white' />
          <Text style={{color: 'white'}}>Cargando...</Text>
        </View>
      );
    } else {
      let filtrosCalendario = (<View />);
      if (this.state.showFiltrosCalendario) {
        filtrosCalendario = (
          <View style={{position: 'absolute', top: 56, right: 10, padding: 20,backgroundColor: 'black'}}>
            <TouchableOpacity onPress={() => this.handleCalendarioFiltroChange('Todos')}>
              <Text style={styles.filtrosText}>Todos</Text>
              <View style={{backgroundColor: 'white', height: 1, marginTop: 5, marginBottom: 5}}/>
            </TouchableOpacity>
            {this.props.tiposTareas.map(tt =>
              <TouchableOpacity onPress={() => this.handleCalendarioFiltroChange(tt)}>
                <Text style={styles.filtrosText}>{tt}</Text>
                <View style={{backgroundColor: 'white', height: 1, marginTop: 5, marginBottom: 5}}/>
              </TouchableOpacity>
            )}
          </View>
        );
      }

      let initialRoute = {title: `Studia`, index: 0};
      if (!this.props.currentUser || !this.props.currentUser.email) {
        initialRoute = {title: `Studia`, index: 99};
      }

      screen = (      
        <View style={{flex: 1}}>
          <Navigator
            ref="navigator"
            initialRoute={initialRoute}
            renderScene={this.renderScene}
            tintColor={'white'}
            style={{flex: 1}}
            navigationBar={
              <Navigator.NavigationBar
                routeMapper={{
                  LeftButton: this.renderBarLeftButton,
                  RightButton: (route, navigator, index, navState) => this.renderBarRightButton(route, navigator, index, navState, this.props.calendarioFiltro),
                  Title: (route, navigator, index, navState) => this.renderTitle(route, navigator, index, navState, this.props.calendarSearch, this.handleCalendarSearchChange, this.props.notificacionesSearch, this.handleNotificacionesSearchChange, this.props.mensajesSearch, this.handleMensajesSearchChange)
                }}
                style={styles.bar}
              />            
            }
          />
          {filtrosCalendario}
        </View>
      );      
    }

    return screen
  }
}



export default AppPresenter;
