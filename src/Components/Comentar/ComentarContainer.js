import React, { Component } from 'react';
import { connect } from 'react-redux';
import ComentarPresenter from './ComentarPresenter';
import actions from './../../state/actions/actions';
import * as selectors from './../../state/reducers/reducers';

class Comentar extends Component {
  render() {
    const props = Object.assign({}, this.props);
    return (
      <ComentarPresenter { ...props } />
    );    
  }	
}

Comentar.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  navigator: ownProps.navigator,
  type: ownProps.type,
  tarea: ownProps.tarea,
  message: ownProps.message,
  selectedEstudiante: selectors.getSelectedEstudiante(state),
  currentUser: selectors.getCurrentUser(state)
});

const mapDispatchToProps = (dispatch) => ({
	insertComentarioTarea: (selectedEstudiante, tarea, text, currentUser) => {
    return dispatch(actions.tareas.insertComentarioTarea(selectedEstudiante, tarea, text, currentUser));
  },
	insertComentarioMessage: (selectedEstudiante, message, text, currentUser) => {
    return dispatch(actions.mensajes.insertComentarioMessage(selectedEstudiante, message, text, currentUser));
  }
});

const ComentarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Comentar);

export default ComentarContainer;