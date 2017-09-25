import React, { Component } from 'react';
import { connect } from 'react-redux';
import CalendarioPresenter from './CalendarioPresenter';
import actions from './../../state/actions/actions';
import * as selectors from './../../state/reducers/reducers';

class Calendario extends Component {
  constructor(props) {
    super(props);

    let fechaInicio = new Date();
    fechaInicio = new Date(fechaInicio.setMonth(fechaInicio.getMonth() - 6));
    fechaInicio = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), 1);
    
    let fechaFin = new Date();
    fechaFin =  new Date(fechaFin.setMonth(fechaFin.getMonth() + 6));
    fechaFin = new Date(fechaFin.getFullYear(), fechaFin.getMonth() + 1, 0);
    this.state = {
      fechaInicio,
      fechaFin,
      loading: true
    }
  }

  componentWillMount() {
    if (this.props.selectedEstudiante && this.props.currentUser) {
      Promise.all([
        this.props.fetchTiposTareas(this.props.selectedEstudiante, this.props.currentUser),
        this.props.fetchTareas(this.props.selectedEstudiante, this.state.fechaInicio,  this.state.fechaFin, this.props.calendarSearch, this.props.calendarioFiltro, this.props.currentUser)
      ])
      .then(() => {
        this.setState({ loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
    } else {
      this.setState({ loading: false });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.selectedEstudiante && this.props.currentUser) {
      if (nextProps.calendarSearch !== this.props.calendarSearch) {
        this.setState({loading: true}, () => {
          this.props.fetchTareas(this.props.selectedEstudiante, this.state.fechaInicio,  this.state.fechaFin, nextProps.calendarSearch, nextProps.calendarioFiltro, this.props.currentUser)
          .then(() => {
            this.setState({ loading: false });
          })
          .catch((error) => {
            this.setState({ loading: false });
          })
        });
      } else if (nextProps.calendarioFiltro !== this.props.calendarioFiltro) {
        this.setState({loading: true}, () => {
          this.props.fetchTareas(this.props.selectedEstudiante, this.state.fechaInicio,  this.state.fechaFin, nextProps.calendarSearch, nextProps.calendarioFiltro, this.props.currentUser)
          .then(() => {
            this.setState({ loading: false });
          })
        });
      }
    }
  }

  render() {
    const props = Object.assign({}, this.props, { loading: this.state.loading});
    return (
      <CalendarioPresenter { ...props } />
    );    
  }	
}

Calendario.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  currentUser: selectors.getCurrentUser(state),
  navigator: ownProps.navigator,
  tareas: selectors.getTareasBySelectedStudent(state),
  calendarSearch: selectors.getCalendarSearch(state),
  calendarioFiltro: selectors.getCalendarioFiltro(state),
  selectedEstudiante: selectors.getSelectedEstudiante(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchTiposTareas: (selectedEstudiante, userData) => {
    return dispatch(actions.tiposTareas.fetchTiposTareas(selectedEstudiante, userData));
  },
  fetchTareas: (selectedEstudiante, fechaInicio, fechaFin, search, type, userData) => {
    return dispatch(actions.tareas.fetchTareas(selectedEstudiante, fechaInicio, fechaFin, search, type, userData))
  }
});

const CalendarioContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendario);

export default CalendarioContainer;
