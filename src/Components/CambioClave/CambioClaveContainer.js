import React, { Component } from 'react';
import { connect } from 'react-redux';
import CambioClavePresenter from './CambioClavePresenter';
import actions from './../../state/actions/actions';
import * as selectors from './../../state/reducers/reducers';

class CambioClave extends Component {
  render() {
    const props = Object.assign({}, this.props);
    return (
      <CambioClavePresenter { ...props } />
    );    
  }	
}

CambioClave.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
	navigator: ownProps.navigator,
  currentUser: selectors.getCurrentUser(state)
});

const mapDispatchToProps = (dispatch) => ({
	changePassword: (currentPassword, newPassword, userData) => {
    return dispatch(actions.context.changePassword(currentPassword, newPassword, userData));
  }
});

const CambioClaveContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CambioClave);

export default CambioClaveContainer;