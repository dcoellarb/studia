import React, { Component } from 'react';
import { connect } from 'react-redux';
import TareaDetallePresenter from './TareaDetallePresenter';
import actions from './../../state/actions/actions';
import * as selectors from './../../state/reducers/reducers';

class TareaDetalle extends Component {
  componentWillMount() {
    this.props.fetchTareaComentarios(this.props.selectedEstudiante, this.props.tarea.id);
  }

  render() {
    const props = Object.assign({}, this.props);
    return (
      <TareaDetallePresenter { ...props } />
    );    
  }	
}

TareaDetalle.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
	navigator: ownProps.navigator,
  tarea: ownProps.tarea,
  tareaComentarios: selectors.getTareaComentarios(ownProps.tarea.id, state),
  selectedEstudiante: selectors.getSelectedEstudiante(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchTareaComentarios: (selectedEstudiante, id) => {
    dispatch(actions.tareas.fetchTareaComentarios(selectedEstudiante, id))
  }  
});

const TareaDetalleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TareaDetalle);

export default TareaDetalleContainer;