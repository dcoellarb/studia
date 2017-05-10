import React, { Component } from 'react';
import { connect } from 'react-redux';
import OlvidoClavePresenter from './OlvidoClavePresenter';

class OlvidoClave extends Component {
  render() {
    const props = Object.assign({}, this.props);
    return (
      <OlvidoClavePresenter { ...props } />
    );    
  }	
}

OlvidoClave.propTypes = {};

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch) => ({});

const OlvidoClaveContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OlvidoClave);

export default OlvidoClaveContainer;