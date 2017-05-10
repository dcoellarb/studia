import React, { Component } from 'react';
import { connect } from 'react-redux';
import EnviarMensajePresenter from './EnviarMensajePresenter';

class EnviarMensaje extends Component {
  render() {
    const props = Object.assign({}, this.props);
    return (
      <EnviarMensajePresenter { ...props } />
    );    
  }	
}

EnviarMensaje.propTypes = {};

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch) => ({});

const EnviarMensajeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EnviarMensaje);

export default EnviarMensajeContainer;