import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity,
  Image,
  ScrollView,
  WebView,
  BackAndroid
} from 'react-native'
import HTMLView from 'react-native-htmlview';
import HTML from 'react-native-fence-html'
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from './../../styles/styles';
import { globalColors } from './../../styles/globals';
import { stringifyDate } from './../../utils/formatDate';

const testhtml = '<html><body><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td><table border="0" cellpadding="0" cellspacing="0" align="center" width="640" bgcolor="#FFFFFF"><tbody><tr><td bgcolor="#2F4497" style="font-size: 0; line-height: 0; padding: 0 0px;" height="10" align="center" class="responsive-image"><img align="left" src="http://23.239.30.145/uploads/user/avatar/15/santana.jpg" width="100" height="100" alt=""><p style="color:#ffffff;font-size:20pt;align:center">Unidad Educativa Santana</p><p style="color:#ffffff;font-size:18pt;padding-top:10px">Sistema Gestión de Tareas</p></td></tr><tr><td style="font-size: 0; line-height: 0;" height="30">&nbsp;</td></tr><tr><td style="padding: 10px 10px 20px 10px;"><div style="font-size: 20px;">Estimados estudiantes.</div><br><div <p="" style="align:justify" align="justify">por este medio usted y su representante recibirán toda la información referente a las tareas que serán enviadas por sus profesores. Esta herramienta le permite acceder a toda la información que usted requiere para desarrollar su trabajo, enviar y adjuntar la documentación que sea solicitada y hacer las consultas que requiera.Le pedimos revisar toda la Información relacionada con la tarea(s) antes de iniciar su trabajo.<p></p></div></td></tr><tr><td style="padding: 10px 10px 20px 10px;"><div style="font-size: 20px;">(Título de la Tarea)</div><br><div <p="" style="align:justify" align="justify">(Completar descripción de la tarea)<p></p></div></td></tr><tr><td style="font-size: 0; line-height: 0;" height="20">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></body></html>>'
//<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Responsive email</title></head>
//<style type="text/css">body {margin: 10px 0; padding: 0 10px; background: #F9F2E7; font-size: 13px;}table {border-collapse: collapse;}td {font-family: arial, sans-serif; color: #333333;}@media only screen and (max-width: 480px) {body,table,td,p,a,li,blockquote {-webkit-text-size-adjust:none !important;}table {width: 100% !important;}.responsive-image img {height: auto !important;max-width: 100% !important;width: 100% !important;}}</style>


const stylesObjects = {
  container: Object.assign({}, globalStyles.barMargin, {
    flex: 1,
    backgroundColor: 'whitesmoke'
  }),
  overview: {
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightgray'    
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
  actionButtonText: Object.assign({}, globalStyles.actionButtonText)  
}
const styles = StyleSheet.create(stylesObjects);

class TareaDetallePresenter extends Component {
  constructor(props) {
    super(props);
    this.handleComentar = this.handleComentar.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
  }

  handleBack() {
    this.props.navigator.pop();
    return true;
  }

  handleComentar() {
    this.props.navigator.push({index: 4, title: 'Comentar', tarea: this.props.tarea});
  }
  
  renderItem(rowData, sectionID, rowID, highlightRow, handleSelectTarea) {
    let avatar = (<Icon name='account-circle' size={30} color={'gray'} />);
    if (rowData.author.avatar && rowData.author.avatar.length > 0) {
      avatar = (<Image style={styles.imageSmallStyle} source={{uri: rowData.author.avatar}} />);
    }
 
    return (
      <View style={[styles.section, {flexDirection: 'row'}]}>
        {avatar}
        <View style={{flex: 1, marginLeft: 5}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.titleText}>{rowData.author.name}</Text>
            <Text style={styles.lightText}>{stringifyDate(rowData.date)}</Text>
          </View>
          <HTMLView value={rowData.body} />
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
          {/*
          <View style={styles.title}>
            <Text style={styles.titleText}>{this.props.tarea.subject}</Text> 
            <Text style={styles.subTitleText}>{this.props.tarea.name}</Text> 
          </View>
          */}
          <ScrollView style={{height: 200}} contentContainerStyle={{height: 1000}}>
            <WebView source={{html: `<meta name="viewport" content="width=device-width, initial-scale=1.0">${this.props.tarea.description}`}} />
            {/* <HTMLView value={this.props.tarea.description} /> */}
            {/* <HTML html={this.props.tarea.description} /> */}
          </ScrollView>
        </View>
        {/*
        <View style={{alignItems: 'center', marginBottom: 10}}>
          <TouchableOpacity onPress={() => this.handleComentar()} style={styles.actionButton}>        
            <Text style={styles.actionButtonText}>Comentar</Text>
          </TouchableOpacity> 
        </View>
        */}
        <ListView
          enableEmptySections={true}
          dataSource={dataSource.cloneWithRows(itemsMap)}
          renderRow={(rowData, sectionID, rowID, highlightRow) => this.renderItem(rowData, sectionID, rowID, highlightRow, this.handleSelectTarea)}
          removeClippedSubviews={false}
        /> 
        <TouchableOpacity onPress={() => this.handleComentar()} style={styles.actionStyle}>
          <Icon name='add' size={20} color={'white'} />
        </TouchableOpacity>                   
      </View>
    );
  }
}

export default TareaDetallePresenter;

