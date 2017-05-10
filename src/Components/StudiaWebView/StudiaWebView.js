import React, { Component } from 'react';
import { WebView } from 'react-native';

class StudiaWebView extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: this.props.url,
          headers: {
            "token_client": this.props.userData.token,
            "Content-Type": "application/json"
          }
  	    }}
        style={{marginTop: 56}}

      />
    );
  }
}

export default StudiaWebView;
