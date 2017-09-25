import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TextInput,
  ListView,
  TouchableOpacity,
  Image
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from './../../styles/styles';
import { globalColors } from './../../styles/globals';
import Loader from './../Loader/Loader';
import Placeholder from './../Placeholder/Placeholder';
import HTMLView from 'react-native-htmlview';

const stylesObjects = {
  container: Object.assign({}, globalStyles.barMargin, {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 80 : 60    
  }),
  searchContainer: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    backgroundColor: 'lightgray',
    height: 40
  },
  section: Object.assign({}, globalStyles.section, {
    marginTop: 2,
    paddingRight: 20    
  }),
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
  },
  alertText: {
    color: globalColors.primary,
    fontSize: 10
  },
  actionStyle: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: globalColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 20
  },
  imageSmallStyle: Object.assign({}, globalStyles.roundSmallItem)
}
const styles = StyleSheet.create(stylesObjects);

class MensajesPresenter extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    
    this.enviarMensaje = this.enviarMensaje.bind(this);
    this.toggleComments = this.toggleComments.bind(this);
    this.handleComentar = this.handleComentar.bind(this);
  }

  enviarMensaje() {
    this.props.navigator.push({index: 2, title: 'Enviar Mensaje'});    
  }

  toggleComments(id) {
    if (this.state.currentMessage === id) {
      this.setState({currentMessage: undefined});
    } else {
      this.setState({currentMessage: id});
      this.props.fetchMensajeComentarios(id);
    }
  }

  handleComentar(message) {
    this.props.navigator.push({index: 4, title: 'Comentar', type: 'MessageComment', message: message });
  }

  renderCommentItem(rowData, sectionID, rowID, highlightRow) {
    let avatar = (<Icon name='account-circle' size={30} color={'gray'} />);
    if (rowData.author.avatar && rowData.author.avatar.length > 0) {
      avatar = (<Image style={styles.imageSmallStyle} source={{uri: rowData.author.avatar}} />);
    }
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        {avatar}
        <View style={{flex: 1, marginLeft: 5}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>{rowData.author.name ? rowData.author.name : ''}</Text>
            <Text style={styles.lightText}>{rowData.date ? `${rowData.date.getHours() > 12 ? rowData.date.getHours() - 12 : rowData.date.getHours()}:${rowData.date.getMinutes() < 10 ? '0' + rowData.date.getMinutes(): rowData.date.getMinutes()}${rowData.date.getHours() > 11 ? 'pm' : 'am'}` : ''}</Text>
          </View>          
          <HTMLView style={styles.lightText} value={rowData.body ? rowData.body : ''} />          
        </View>        
      </View>
    );
  }

  renderItem(rowData, sectionID, rowID, highlightRow, renderCommentItem) {
    let list = (<View />)

    if (this.state.currentMessage === rowData.id) {
      const dataSourceComments = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });

      if (rowData.childs) {
        const itemsMap = {};
        rowData.childs
        .forEach((i) => {
          itemsMap[i.id] = i;
        }); 
  
        list = (
          <View style={{marginTop: 10}}>
            <ListView
              enableEmptySections={true}
              dataSource={dataSourceComments.cloneWithRows(itemsMap)}
              renderRow={renderCommentItem}
              removeClippedSubviews={false}
            />
          </View>
        );  
      }
    }

    let detalle = (<View/>)
    if (rowData.id === this.state.selectedMessage) {
      detalle = (
        <View>
          <HTMLView style={styles.lightText} value={rowData.body ? rowData.body : ''} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => this.toggleComments(rowData.id)}>
              <Text style={styles.alertText}>Comentarios</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleComentar(rowData)}>
              <Text style={styles.alertText}>Comentar</Text>
            </TouchableOpacity>
          </View>
          {list}          
        </View>
      );
    }

    let avatar = (<Icon name='account-circle' size={30} color={'gray'} />);
    if (rowData.author.avatar && rowData.author.avatar.length > 0) {
      avatar = (<Image style={styles.imageSmallStyle} source={{uri: rowData.author.avatar}} />)
    }

    return (
      <TouchableOpacity onPress={() => this.setState({ selectedMessage: rowData.id})}>
        <View style={styles.section}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            {avatar}
            <View style={{flex: 1, marginLeft: 5}}>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.title}>{rowData.author.name ? rowData.author.name : ''}</Text>
                <Text style={styles.lightText}>{rowData.date ? `${rowData.date.getHours() > 12 ? rowData.date.getHours() - 12 : rowData.date.getHours()}:${rowData.date.getMinutes() < 10 ? '0' + rowData.date.getMinutes(): rowData.date.getMinutes()}${rowData.date.getHours() > 11 ? 'pm' : 'am'}` : ''}</Text>
              </View>
              <Text style={styles.subTtile}>{rowData.subject ? rowData.subject : ''}</Text>
              {detalle}
            </View> 
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    const itemsMap = {};
    this.props.mensajes
    .forEach((i) => {
      itemsMap[i.id] = i;
    });     

    let addAction = (<View />);
    if (this.props.mensajesOnly) {
      addAction = (
        <TouchableOpacity onPress={this.enviarMensaje} style={styles.actionStyle}>
          <Icon name='add' size={20} color={'white'} />
        </TouchableOpacity>      
      );
    }

    let screen = (<Loader />)
    if (!this.props.loading) {
      if (this.props.mensajes.length === 0) {
        screen = (
          <View style={styles.container} >
            <Placeholder message="No hay mensajes disponibles." />
            {addAction}
          </View>
        );
      } else {
        screen = (
          <View style={styles.container} >
            <ListView
              enableEmptySections={true}
              dataSource={dataSource.cloneWithRows(itemsMap)}
              renderRow={(rowData, sectionID, rowID, highlightRow) => this.renderItem(rowData, sectionID, rowID, highlightRow, this.renderCommentItem)}
              removeClippedSubviews={false}
            />
            {addAction}
          </View>
        );
      }      
    }
    return screen;
  }
}

export default MensajesPresenter;
