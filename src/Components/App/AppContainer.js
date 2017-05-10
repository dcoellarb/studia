import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppPresenter from './AppPresenter';
import actions from './../../state/actions/actions';
import * as selectors from './../../state/reducers/reducers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    this.props.getLoginContext()
    .then(user => {      
      this.setState({loading: false});        
    });
  }

  render() {
    const props = Object.assign({}, this.props);
    return (
      <AppPresenter { ...props } loading={this.state.loading} />
    );    
  }	
}

App.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
	currentUser: selectors.getCurrentUser(state),
	currentComponent: selectors.getCurrentComponent(state),
  calendarSearch: selectors.getCalendarSearch(state),
  notificacionesSearch: selectors.getNotificacionesSearch(state),
  mensajesSearch: selectors.getMensajesSearch(state),
  tiposTareas: selectors.getTiposTareas(state),
  calendarioFiltro: selectors.getCalendarioFiltro(state)
});

const mapDispatchToProps = (dispatch) => ({
  getLoginContext: () => {
    return dispatch(actions.context.getLoginContext())
  },
  handleCalendarSearchChange: (text) => {
    dispatch(actions.context.handleCalendarSearchChange(text));
  },
  handleNotificacionesSearchChange: (text) => {
    dispatch(actions.context.handleNotificacionesSearchChange(text));
  },
  handleMensajesSearchChange: (text) => {
    dispatch(actions.context.handleMensajesSearchChange(text));
  },
  handleCalendarioFiltroChange: (calendarioFiltro) => {
    dispatch(actions.context.handleCalendarioFiltroChange(calendarioFiltro));
  }
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
