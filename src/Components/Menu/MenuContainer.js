import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuPresenter from './MenuPresenter';
import actions from './../../state/actions/actions';
import * as selectors from './../../state/reducers/reducers';

class Menu extends Component {
  render() {
    const props = Object.assign({}, this.props);
    return (
      <MenuPresenter { ...props } />
    );    
  }	
}

Menu.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
	estudiantes: selectors.getEstudiantes(state),
  selectedEstudiante: selectors.getSelectedEstudiante(state)
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedEstudiante: (estudiante) => {
    dispatch(actions.context.setSelectedEstudiante(estudiante));
  }
});

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

export default MenuContainer;
