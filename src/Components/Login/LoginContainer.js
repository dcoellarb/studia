import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginPresenter from './LoginPresenter';
import actions from './../../state/actions/actions';

class Login extends Component {
  render() {
    const props = Object.assign({}, this.props);
    return (
      <LoginPresenter { ...props } />
    );    
  }	
}

Login.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  navigator: ownProps.navigator
});

const mapDispatchToProps = (dispatch) => ({
	login: (username, password) => {
    return dispatch(actions.context.login(username, password));
  }
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;
