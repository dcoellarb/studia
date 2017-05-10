import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotificacionesPresenter from './NotificacionesPresenter';
import actions from './../../state/actions/actions';
import * as selectors from './../../state/reducers/reducers';

class Notificaciones extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true};
  }

  componentWillMount() {
    this.props.fetchNotificaciones(0, this.props.notificacionesSearch, this.props.currentUser)
    .then(() => {
      this.setState({ loading: false });
    })
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.notificacionesSearch !== this.props.notificacionesSearch) {
      this.setState({loading: true}, () => {
        this.props.fetchNotificaciones(0, nextProps.notificacionesSearch, this.props.currentUser)
        .then(() => {
          this.setState({ loading: false });
        });
      });
    }
  }  

  render() {
    const props = Object.assign({}, this.props, { loading: this.state.loading});
    return (
      <NotificacionesPresenter { ...props } />
    );    
  }	
}

Notificaciones.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  currentUser: selectors.getCurrentUser(state),
	navigator: ownProps.navigator,
	mensajesOnly: ownProps.mensajesOnly,
  notificaciones: selectors.getNotificaciones(state),
  notificacionesSearch: selectors.getNotificacionesSearch(state)  
});

const mapDispatchToProps = (dispatch) => ({
  fetchNotificaciones: (page, search, userData) => {
    return dispatch(actions.notificaciones.fetchNotificaciones(page, search, userData));  
  }  
});

const NotificacionesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notificaciones);

export default NotificacionesContainer;
