import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { globalColors } from './../../styles/globals';
import globalStyles from './../../styles/styles';
import Loader from './../Loader/Loader';
import Placeholder from './../Placeholder/Placeholder';

const stylesObjects = {
  container: Object.assign({}, globalStyles.barMargin),
  subContainer: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'
  },
  section: Object.assign({}, globalStyles.section),
  title: {
    color: globalColors.text,
    fontSize: 12
  },
  subTtile: {
    color: globalColors.text,
    fontSize: 10
  },
  lightText: {
    color: globalColors.textLight,
    fontSize: 10
  }  
}
const styles = StyleSheet.create(stylesObjects);

class CalificacionesPresenter extends Component {
  constructor(props) {
    super(props);
    this.handlePDFView = this.handlePDFView.bind(this);
  }

  handlePDFView(name, url) {
    this.props.navigator.push({index: 100, title: name, url, userData: this.props.currentUser});
  }

  renderItem(rowData, sectionID, rowID, highlightRow, handlePDFView) {
    return (
      <View style={[styles.section, {flexDirection: 'row', justifyContent:'space-between'}]}>
        <View style={{flexDirection: 'row'}}>
          <Icon name='description' size={20} color={globalColors.text} />
          <Text style={styles.title}>{rowData.name}</Text>
        </View>
        <TouchableOpacity onPress={() => handlePDFView(rowData.name, rowData.pdfUrl)}>
          <Icon name='file-download' size={30} color={globalColors.secondary} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    itemsMap = {};
    this.props.calificaciones
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach((i) => {
      itemsMap[i.id] = i;
    });

    let screen = (<Loader />)
    if (!this.props.loading) {
      if (this.props.calificaciones.length === 0) {
        screen = (<Placeholder message="No hay calificaciones disponibles." />);
      } else {
        screen = (
          <View style={styles.container}>
            <ListView
              enableEmptySections={true}
              dataSource={dataSource.cloneWithRows(itemsMap)}
              renderRow={(rowData, sectionID, rowID, highlightRow) => this.renderItem(rowData, sectionID, rowID, highlightRow, this.handlePDFView)}
              removeClippedSubviews={false}
            />
          </View>
        );
      }
    }
    return screen;
  }
}

export default CalificacionesPresenter;
