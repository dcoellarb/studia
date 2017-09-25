import React, { Component } from 'react';
import { connect } from 'react-redux';
import PreferenciasPresenter from './PreferenciasPresenter';
import actions from './../../state/actions/actions';
import * as selectors from './../../state/reducers/reducers';

class Preferencias extends Component {
  render() {
    const props = Object.assign({}, this.props);
    return (
      <PreferenciasPresenter { ...props } />
    );    
  }	
}

Preferencias.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  currentUser: selectors.getCurrentUser(state),
	navigator: ownProps.navigator,
  profiles: selectors.getProfiles(state)
});

const mapDispatchToProps = (dispatch) => ({
  cambiarProfile: (profile, userData) => {
    dispatch(actions.context.changeProfile(profile, userData))
  },
  cerrarSesion: () => {
    return dispatch(actions.context.logout());
  }
});

const PreferenciasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Preferencias);

export default PreferenciasContainer;