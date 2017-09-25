import React, { Component } from 'react';
import { connect } from 'react-redux';
import CalificacionesPresenter from './CalificacionesPresenter';
import actions from './../../state/actions/actions';
import * as selectors from './../../state/reducers/reducers';

class Calificaciones extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true};
  }

  componentWillMount() {
    this.props.fetchCalificaciones(this.props.selectedEstudiante, this.props.currentUser)
    .then(() => {
      this.setState({ loading: false });
    })
    .catch((error) => {
      this.setState({ loading: false });
    });  
  }

  render() {
    const props = Object.assign({}, this.props, { loading: this.state.loading});
    return (
      <CalificacionesPresenter { ...props } />
    );    
  }	
}

Calificaciones.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  currentUser: selectors.getCurrentUser(state),
  navigator: ownProps.navigator,
	calificaciones: selectors.getCalificacionesBySelectedStudent(state),
  selectedEstudiante: selectors.getSelectedEstudiante(state)
});

const mapDispatchToProps = (dispatch) => ({
	fetchCalificaciones: (selectedEstudiante, userData) => {
		return dispatch(actions.calificaciones.fetchCalificaciones(selectedEstudiante, userData));
	}
});

const CalificacionesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Calificaciones);

export default CalificacionesContainer;
