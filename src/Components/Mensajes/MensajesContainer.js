import React, { Component } from 'react';
import { connect } from 'react-redux';
import MensajesPresenter from './MensajesPresenter';
import actions from './../../state/actions/actions';
import * as selectors from './../../state/reducers/reducers';

class Mensajes extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false};
  }

  componentWillMount() {
    this.setState({ loading: true }, () => {
      this.props.fetchMensajes(this.props.selectedEstudiante, 0, this.props.mensajesSearch, this.props.currentUser)
      .then(
        () => {
          this.setState({ loading: false });
        },
        (error) => {
          this.setState({ loading: false });
        }        
      );
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.mensajesSearch !== this.props.mensajesSearch) {
      this.setState({loading: true}, () => {
        this.props.fetchMensajes(this.props.selectedEstudiante, 0, nextProps.mensajesSearch, this.props.currentUser)
        .then(() => {
          this.setState({ loading: false });
        })
        .catch((error) => {
          this.setState({ loading: false });
        });          
      });
    }
  }  

  render() {
    const props = Object.assign({}, this.props, { loading: this.state.loading});
    return (
      <MensajesPresenter { ...props } />
    );    
  }	
}

Mensajes.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  currentUser: selectors.getCurrentUser(state),
	navigator: ownProps.navigator,
	mensajesOnly: ownProps.mensajesOnly,
  mensajes: selectors.getMensajes(state),
  mensajesSearch: selectors.getMensajesSearch(state),
  selectedEstudiante: selectors.getSelectedEstudiante(state)  
});

const mapDispatchToProps = (dispatch) => ({
  fetchMensajes: (selectedEstudiante, page, search, userData) => {
    return dispatch(actions.mensajes.fetchMensajes(selectedEstudiante, page, search, userData));  
  },
  fetchMensajeComentarios: (id, userData) => {
    return dispatch(actions.mensajes.fetchMensajeComentarios(id, userData));  
  }    
});

const MensajesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Mensajes);

export default MensajesContainer;
