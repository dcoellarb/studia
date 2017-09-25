import React, { Component } from 'react';
import { connect } from 'react-redux';
import EnviarMensajePresenter from './EnviarMensajePresenter';
import actions from './../../state/actions/actions';
import * as selectors from './../../state/reducers/reducers';

class EnviarMensaje extends Component {
  render() {
    const props = Object.assign({}, this.props);
    return (
      <EnviarMensajePresenter { ...props } />
    );    
  }	
}

EnviarMensaje.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  selectedEstudiante: selectors.getSelectedEstudiante(state),  
  currentUser: selectors.getCurrentUser(state),
  navigator: ownProps.navigator,
  recipients: selectors.getRecipients(state),  
});

const mapDispatchToProps = (dispatch) => ({
  fetchRecipients: (selectedEstudiante, search, userData) => {
    return dispatch(actions.recipients.fetchRecipients(selectedEstudiante, search, userData));
  },
  clearRecipients: () => {
    dispatch(actions.recipients.setRecipients([]));
  },
  createMessage: (selectedEstudiante, subject, recipients, text, userData) => {
    return dispatch(actions.mensajes.createMessage(selectedEstudiante, subject, recipients, text, userData));
  }
});

const EnviarMensajeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EnviarMensaje);

export default EnviarMensajeContainer;