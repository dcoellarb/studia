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
import { stringifyDate } from './../../utils/formatDate'
import Loader from './../Loader/Loader';
import Placeholder from './../Placeholder/Placeholder';

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
    marginTop: 2
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

class NotificacionesPresenter extends Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.enviarMensaje = this.enviarMensaje.bind(this);
    this.toggleNotificacion = this.toggleNotificacion.bind(this);
  }

  enviarMensaje() {
    this.props.navigator.push({index: 2, title: 'Enviar Mensaje'});    
  }

  toggleNotificacion(id) {
    if (id === this.state.selectedNotificacion) {
      this.setState({selectedNotificacion: undefined});
    } else {
      this.setState({selectedNotificacion: id});
    }
  }

  renderItem(rowData, sectionID, rowID, highlightRow, toggleNotificacion) {
    let detalle = (<View/>)
    if (rowData.id === this.state.selectedNotificacion) {
      detalle = (
        <View>
          <Text style={styles.lightText}>
            {rowData.body}
          </Text>
        </View>
      );
    }
    return (
      <TouchableOpacity onPress={() => toggleNotificacion(rowData.id)}>
        <View style={styles.section}>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.imageSmallStyle} source={{uri: rowData.author.imageUrl}} />
            <View style={{marginLeft: 5}}>
              <Text style={styles.title}>{rowData.subject}</Text>
              <Text style={styles.lightText}>{stringifyDate(rowData.date)}</Text>
              <Text style={styles.subTtile}>{rowData.author.name}</Text>
            </View>
          </View>
          {detalle}
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
    this.props.notificaciones
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
      if (this.props.notificaciones.length === 0) {
        screen = (<Placeholder message="No hay notificaciones disponibles." />);
      } else {
        screen = (
          <View style={styles.container} >
            <ListView
              enableEmptySections={true}
              dataSource={dataSource.cloneWithRows(itemsMap)}
              renderRow={(rowData, sectionID, rowID, highlightRow) => this.renderItem(rowData, sectionID, rowID, highlightRow, this.toggleNotificacion)}
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

export default NotificacionesPresenter;
