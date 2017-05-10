import React, { Component } from 'react';
import { connect } from 'react-redux';
import AsistenciaPresenter from './AsistenciaPresenter';
import actions from './../../state/actions/actions';
import * as selectors from './../../state/reducers/reducers';

class Asistencia extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true};
  }

  componentWillMount() {
    this.props.fetchInasistencias(this.props.selectedEstudiante, this.props.currentUser)
    .then(() => {
      this.setState({ loading: false });
    })
  }

  render() {
    const props = Object.assign({}, this.props, { loading: this.state.loading});
    return (
      <AsistenciaPresenter { ...props } />
    );    
  }	
}

Asistencia.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  currentUser: selectors.getCurrentUser(state),
  inasistencias: selectors.getInasistenciasBySelectedEstudiante(state),
  selectedEstudiante: selectors.getSelectedEstudiante(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchInasistencias: (selectedEstudiante, userData) => {
    return dispatch(actions.asistencias.fetchInasistencias(selectedEstudiante, userData));  
  }
});

const AsistenciaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Asistencia);

export default AsistenciaContainer;
