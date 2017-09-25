import React, { Component } from 'react';
import {
  InteractionManager,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ListView,
  View,
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { globalColors } from './../../styles/globals';
import globalStyles from './../../styles/styles';
import Loader from './../Loader/Loader';
import Placeholder from './../Placeholder/Placeholder';

const DAY_WIDTH =  Math.floor(Dimensions.get('window').width / 7)
const DAYS = ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'];
const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

const stylesObjects = {
  container: Object.assign({}, globalStyles.barMargin, {
    backgroundColor: 'whitesmoke'
  }),
  subContainer: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'
  },
  date: {
    width: DAY_WIDTH,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  month: {
    fontSize: 12,
    marginTop: 10,
    marginLeft: 10
  },
  dayOfWeek: {
    fontSize: 10,
  },
  dayContainer: {
    height: 12,
  },
  dayContainer: {
    backgroundColor: 'white',
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  day: {
    fontSize: 12,
  },
  currentDay: {
    color: globalColors.secondary,
  },
  selectedDayContainer: {
    backgroundColor: globalColors.secondary,
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedDay: {
    color: 'white',
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
  },
  headerStyle: {
    marginTop: 10,
    padding: 5,
    alignItems: 'center'
  },
  indicator: Object.assign({}, globalStyles.indicator)
}
const styles = StyleSheet.create(stylesObjects);

class CalendarioPresenter extends Component {
  constructor(props) {
    super(props);

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 6);
    dates = [];
    let loopDate = new Date(startDate);
    while(loopDate < endDate) {
      dates.push(new Date(loopDate));
      loopDate.setDate(loopDate.getDate() + 1);
    }

    this.state = {
      startDate,
      endDate,
      dates,
      currentDate: new Date(),
      selectedDate: new Date()
    }

    this.setScrollViewRef = this.setScrollViewRef.bind(this);    
    this.onScroll = this.onScroll.bind(this);    
    this.renderItem = this.renderItem.bind(this);
    this.handleSelectTarea = this.handleSelectTarea.bind(this);
  }

  handleSelectTarea(tarea) {
    this.props.navigator.push(
      {
        index: 1,
        title: tarea.name,
        subtitle: tarea.subject,
        tarea
      }
    );
  }

  changeSelectedDate(date) {
    this.setState({selectedDate: date});
  }

  setScrollViewRef(ref) {
    this.scrollView = ref;
  }

  onScroll(event) {
    const days = event.nativeEvent.contentOffset.x / DAY_WIDTH;
    const currentDate = new Date(this.state.startDate);
    currentDate.setDate(currentDate.getDate() + days);
    this.setState({currentDate})
  }

  componentDidMount() {
    setTimeout(() => {
      const days = Math.round((new Date() - this.state.startDate)/(1000*60*60*24));
      this.scrollView.scrollTo({x: DAY_WIDTH * (days - 3), animated: true});
    }, 500);
  }

  renderHeader(sectionData, sectionID) {
    return (
      <View style={styles.headerStyle}>
        <Text style={{ fontSize: 14, color: 'gray' }}>{sectionData[0].type.name}</Text>
      </View>
    );
  }

  renderItem(rowData, sectionID, rowID, highlightRow, handleSelectTarea) {
    return (
      <TouchableOpacity onPress={() => handleSelectTarea(rowData)}>
        <View style={[styles.section, {flexDirection: 'row', justifyContent:'space-between'}]} >
          <View style={{flexDirection: 'row'}}>
            <Icon name='subject' size={40} color={globalColors.text} />
            <View style={{marginLeft: 5}}>
              <Text style={styles.title}>{rowData.name}</Text>
              <Text style={styles.subTtile}>{rowData.subject}</Text>
              <Text style={styles.subTtile}>{rowData.coordinador}</Text>
              <Text style={styles.lightText}>Estado: {rowData.state}</Text>
            </View>
          </View>
          {/*
          <Icon name='attach-file' size={30} color={globalColors.secondary} />
          */}
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    let screen = (<Loader />)
    if (!this.props.loading) {
      if (this.props.tareas && this.props.tareas.length === 0) {
        screen = (<Placeholder message="No hay actividades para el dia seleccionado." />);
      } else {
        const types = {}
        this.props.tareas
        .filter(t => 
          t.date_limit.getYear() === this.state.selectedDate.getYear() &&
          t.date_limit.getMonth() === this.state.selectedDate.getMonth() &&
          t.date_limit.getDate() === this.state.selectedDate.getDate() &&
          (!this.props.calendarSearch || this.props.calendarSearch.length === 0 || t.name.toLowerCase().startsWith(this.props.calendarSearch.toLowerCase())) &&
          (this.props.calendarioFiltro.id === 0 || t.type.id === this.props.calendarioFiltro.id)
        )
        .forEach(t => {
          if (!types[t.type.id]) {
            types[t.type.id] = this.props.tareas.filter(t1 => 
              t1.date_limit.getYear() === this.state.selectedDate.getYear() &&
              t1.date_limit.getMonth() === this.state.selectedDate.getMonth() &&
              t1.date_limit.getDate() === this.state.selectedDate.getDate() &&
              t1.type.id === t.type.id &&
              (!this.props.calendarSearch || this.props.calendarSearch.length === 0 || t1.name.toLowerCase().startsWith(this.props.calendarSearch.toLowerCase())) &&
              (this.props.calendarioFiltro.id === 0 || t1.type.id === this.props.calendarioFiltro.id)
            );
          }
        });
        const dataSource = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
          sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        screen = (
          <ListView
            enableEmptySections={true}
            dataSource={dataSource.cloneWithRowsAndSections(types)}
            renderSectionHeader={(sectionData, sectionID) => this.renderHeader(sectionData, sectionID)}
            renderRow={(rowData, sectionID, rowID, highlightRow) => this.renderItem(rowData, sectionID, rowID, highlightRow, this.handleSelectTarea)}
            removeClippedSubviews={false}
          />
        );
      }
    }
    return (
      <View style={[styles.container, {flex: 1}]}>
        <View style={styles.subContainer}>
          <Text style={styles.month}>{MONTHS[this.state.currentDate.getMonth()]} {this.state.currentDate.getFullYear()}</Text>
          <ScrollView
            ref={this.setScrollViewRef}
            onScroll={this.onScroll}
            style={{width: DAY_WIDTH * 7}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled
            bounces
          >
            {this.state.dates.map(d => {
              const today = new Date();
              let extraStyle = {};
              let containerExtraStyle = {};
              if (d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()) {
                extraStyle = styles.currentDay;
              }
              if (d.getDate() === this.state.selectedDate.getDate() && d.getMonth() === this.state.selectedDate.getMonth() && d.getFullYear() === this.state.selectedDate.getFullYear()) {
                containerExtraStyle = styles.selectedDayContainer;  
                extraStyle = styles.selectedDay;  
              }
              let indicator = (<View />);
              if (this.props.tareas.find(t => 
                t.date_limit.getYear() === d.getYear() &&
                t.date_limit.getMonth() === d.getMonth() &&
                t.date_limit.getDate() === d.getDate()
              )) {
                indicator = (<View style={styles.indicator} />)
              }
              return (
                <View style={styles.date}>
                  <Text style={styles.dayOfWeek}>{DAYS[d.getDay()]}</Text>
                  <TouchableOpacity onPress={() => this.changeSelectedDate(d)}>
                    <View style={[styles.dayContainer, containerExtraStyle]}>
                      <Text style={[styles.day, extraStyle]}>{d.getDate()}</Text>
                    </View>
                  </TouchableOpacity>
                  {indicator}
                </View>
              );
            })}
          </ScrollView>
        </View>
        {screen}
      </View>
    );
  }
}

export default CalendarioPresenter;