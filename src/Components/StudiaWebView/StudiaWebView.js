import React, { Component } from 'react';
import {
  WebView,
  View,
  Text
} from 'react-native';
import Loader from './../Loader/Loader';

class StudiaWebView extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false };
  }

  render() {
    let header = (<View />);
    if (this.state.loading) {
      header = (<Loader />);
    }
    return (
      <View style={{flex: 1}}>
        {header}
        <WebView
          source={{
            uri: this.props.url,
            headers: {
              "token_client": this.props.userData.token,
              "Content-Type": "application/json"
            }
          }}
          onNavigationStateChange={(arg) => {
            this.setState({ loading: !this.state.loading });
          }}
          style={{flex: 1, marginTop: 76}}
        />        
      </View>
    );
  }
}

export default StudiaWebView;
