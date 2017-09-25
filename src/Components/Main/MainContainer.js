import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainPresenter from './MainPresenter';
import actions from './../../state/actions/actions';
import * as selectors from './../../state/reducers/reducers';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    this.props.fetchProfiles(this.props.currentUser)
    .then(() => {
      return this.props.fetchEstudiantes(this.props.currentUser)
    })
    .then(
      (results) => {
        this.setState({loading: false});
      },
      error => {
        this.setState({ loading: false });
      }
    )
  }
   
  render() {
    const props = Object.assign({}, this.props, {
      loading: this.state.loading
    });
    return (
      <MainPresenter { ...props } />
    );    
  }	
}

Main.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  currentUser: selectors.getCurrentUser(state),
  navigator: ownProps.navigator
});

const mapDispatchToProps = (dispatch) => ({
  fetchProfiles: (userData) => {
    return dispatch(actions.profiles.fetchProfiles(userData));
  },
  fetchEstudiantes: (userData) => {
    return dispatch(actions.estudiantes.fetchEstudiantes(userData));
  },
  setCurrentComponent: (componentName) => {
    dispatch(actions.context.setCurrentComponent(componentName));
  }	
});

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default MainContainer;
