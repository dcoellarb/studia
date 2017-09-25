import React, { Component } from 'react';
import {
  WebView,
  View,
  Text,
  StyleSheet,
  BackAndroid
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import PDFView from 'react-native-pdf-view';
import Loader from './../Loader/Loader';

const styles = StyleSheet.create({
  pdf: {
    flex:1
  }
});

class StudiaPDFView extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true };
    this.handleBack = this.handleBack.bind(this);
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
  }

  handleBack() {
    this.props.navigator.pop();
    return true;
  }

  componentDidMount() {
    const url = this.props.url;
    const headers = {
      "token_client": this.props.userData.token,
      "Content-Type": "application/json"
    };
    RNFetchBlob.fetch('GET', url, headers)
    // when response status code is 200
    .then((res) => {
      let base64Str = res.base64()
      let pdfLocation = RNFetchBlob.fs.dirs.DocumentDir + '/temp.pdf';
      RNFetchBlob.fs.writeFile(pdfLocation, base64Str, 'base64');

      this.setState({
        loading: false,
        pdf: pdfLocation
      });
    })
    // Status code is not 200
    .catch((errorMessage, statusCode) => {
      alert('No se pudo cargar el PDF.');
    })    
  }

  render() {
    let header = (<View style={{ height: 60 }} />);
    if (this.state.loading) {
      header = (<Loader />);
    }
    return (
      <View style={{flex: 1}}>
        {header}
        <PDFView
          src={this.state.pdf}
         style={styles.pdf}/>        
      </View>
    );
  }
}

export default StudiaPDFView;
