import React, { Component } from 'react';
import { connect } from 'react-redux';
import ComentarPresenter from './ComentarPresenter';

class Comentar extends Component {
  render() {
    const props = Object.assign({}, this.props);
    return (
      <ComentarPresenter { ...props } />
    );    
  }	
}

Comentar.propTypes = {};

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch) => ({});

const ComentarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Comentar);

export default ComentarContainer;