import React, { Component } from 'react';
import { connect } from 'react-redux';
import OlvidoClavePresenter from './OlvidoClavePresenter';
import actions from './../../state/actions/actions';
import * as selectors from './../../state/reducers/reducers';

class OlvidoClave extends Component {
  render() {
    const props = Object.assign({}, this.props);
    return (
      <OlvidoClavePresenter { ...props } />
    );    
  }	
}

OlvidoClave.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  currentUser: selectors.getCurrentUser(state)  
});

const mapDispatchToProps = (dispatch) => ({
	forgotPassword: (email, userData) => {
    return dispatch(actions.context.forgotPassword(email, userData));
  }
});

const OlvidoClaveContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OlvidoClave);

export default OlvidoClaveContainer;