import React, { Component } from 'react';
import { connect } from 'react-redux';
import CambioClavePresenter from './CambioClavePresenter';

class CambioClave extends Component {
  render() {
    const props = Object.assign({}, this.props);
    return (
      <CambioClavePresenter { ...props } />
    );    
  }	
}

CambioClave.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
	navigator: ownProps.navigator	
});

const mapDispatchToProps = (dispatch) => ({});

const CambioClaveContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CambioClave);

export default CambioClaveContainer;