import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity,
  Image
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from './../../styles/styles';
import { globalColors } from './../../styles/globals';
import { stringifyDate } from './../../utils/formatDate'

const stylesObjects = {
  container: Object.assign({}, globalStyles.barMargin, {
    backgroundColor: 'whitesmoke'
  }),
  overview: {
    padding: 10,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    alignItems: 'center',
    margin: 5
  },
  headerText: {
    fontSize: 8,
  },
  titleText: {
    fontSize: 14,
  },
  subTitleText: {
    fontSize: 12,
  },
  descriptionText: {
    fontSize: 10,
  },
  lightText: {
    fontSize: 8,
    color: globalColors.textLight
  },
  section: Object.assign({}, globalStyles.section, {
    marginTop: 2,
    paddingRight: 40    
  }),
  imageSmallStyle: Object.assign({}, globalStyles.roundSmallItem),
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  actionButton: Object.assign({}, globalStyles.actionButton, {
    width: 100,
    marginTop: 10
  }),
  actionButtonText: Object.assign({}, globalStyles.actionButtonText)  
}
const styles = StyleSheet.create(stylesObjects);

class TareaDetallePresenter extends Component {
  constructor(props) {
    super(props);
    this.handleComentar = this.handleComentar.bind(this)
  }

  handleComentar() {
    this.props.navigator.push({index: 4, title: 'Comentar'});
  }
  
  renderItem(rowData, sectionID, rowID, highlightRow, handleSelectTarea) {
    return (
      <View style={[styles.section, {flexDirection: 'row'}]}>
        <Image style={styles.imageSmallStyle} source={{uri: rowData.author.imageUrl}} />
        <View style={{flex: 1, marginLeft: 5}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.titleText}>{rowData.author.name}</Text>
            <Text style={styles.lightText}>{stringifyDate(rowData.date)}</Text>
          </View>
          <Text style={styles.lightText}>{rowData.body}</Text>
        </View>        
      </View>
    );
  }

  render() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    const itemsMap = {};
    this.props.tareaComentarios
    .forEach((i) => {
      itemsMap[i.id] = i;
    });      

    return (
      <View style={styles.container}>
        <View style={styles.overview}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{stringifyDate(this.props.tarea.date_limit)}</Text> 
            <Text style={styles.headerText}>{this.props.tarea.coordinador}</Text> 
          </View>
          <View style={styles.title}>
            <Text style={styles.titleText}>{this.props.tarea.subject}</Text> 
            <Text style={styles.subTitleText}>{this.props.tarea.name}</Text> 
          </View>
          <View>
            <Text style={styles.descriptionText}>{this.props.tarea.description}</Text> 
          </View>
        </View>
        <View style={{alignItems: 'center', marginBottom: 10}}>
          <TouchableOpacity onPress={() => this.handleComentar()} style={styles.actionButton}>        
            <Text style={styles.actionButtonText}>Comentar</Text>
          </TouchableOpacity> 
        </View>
        <ListView
          enableEmptySections={true}
          dataSource={dataSource.cloneWithRows(itemsMap)}
          renderRow={(rowData, sectionID, rowID, highlightRow) => this.renderItem(rowData, sectionID, rowID, highlightRow, this.handleSelectTarea)}
          removeClippedSubviews={false}
        />        
      </View>
    );
  }
}

export default TareaDetallePresenter;

