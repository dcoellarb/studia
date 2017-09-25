import React, { Component } from 'react';
import {
  Dimensions,
  Text,
  View,
} from 'react-native'
import Drawer from 'react-native-drawer';
import Menu from './../Menu/MenuContainer';
import Calendario from './../Calendario/CalendarioContainer';
import Calificaciones from './../Calificaciones/CalificacionesContainer';
import Asistencia from './../Asistencia/AsistenciaContainer';
import Notificaciones from './../Notificaciones/NotificacionesContainer';
import Mensajes from './../Mensajes/MensajesContainer';
import Preferencias from './../Preferencias/PreferenciasContainer';
import Loader from './../Loader/Loader';

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}

class MainPresenter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false,
      selectedMenu: 'Calendario'
    }

    this.calendario = (<Calendario navigator={this.props.navigator} />);
    this.calificaciones = (<Calificaciones navigator={this.props.navigator} />);
    this.asistencia = (<Asistencia />);
    this.mensajes = (<Mensajes mensajesOnly={true} navigator={this.props.navigator} />);
    this.notficaciones = (<Notificaciones />);
    this.preferencias = (<Preferencias navigator={this.props.navigator} />);

    this.setDrawerRef = this.setDrawerRef.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    //this.renderNavigationView = this.renderNavigationView.bind(this);
    this.selectedMenuChange = this.selectedMenuChange.bind(this);
 }

  setDrawerRef() {
    this.props.setDrawerRef(this.openDrawer);
  }

  openDrawer(open) {
    this.setState({ drawerOpen: open})
  }
  
  selectedMenuChange(option) {
    this.props.setCurrentComponent(option);
    this.setState({drawerOpen: false, selectedMenu: option}, () => {
      this.props.closedDrawer();
    });
  }

  render() {
    let screen;

    if (this.props.loading) {
      screen = (<Loader />);
    } else {
      selectedMenuComponent = this.calendario;
      if (this.state.selectedMenu === 'Calificaciones') {
        selectedMenuComponent = this.calificaciones;
      } else if (this.state.selectedMenu === 'Asistencia') {
        selectedMenuComponent = this.asistencia
      } else if (this.state.selectedMenu === 'Notificaciones') {
        selectedMenuComponent = this.notficaciones;
      } else if (this.state.selectedMenu === 'Mensajes') {
        selectedMenuComponent = this.mensajes;
      } else if (this.state.selectedMenu === 'Preferencias') {
        selectedMenuComponent = this.preferencias;
      }

      screen = (
        <Drawer
          ref={this.setDrawerRef}
          open={this.state.drawerOpen}
          type="overlay"
          content={<Menu selectedMenuChange={this.selectedMenuChange} />}
          tapToClose={true}
          openDrawerOffset={0.2} // 20% gap on the right side of drawer
          panCloseMask={0.2}
          closedDrawerOffset={-3}
          styles={drawerStyles}
          tweenHandler={(ratio) => ({
            main: { opacity:(2-ratio)/2 }
          })}
          >
            {selectedMenuComponent}
        </Drawer>       
      );
    }

    return screen;
  }
}

export default MainPresenter;
