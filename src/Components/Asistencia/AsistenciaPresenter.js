import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from './../../styles/styles';
import { globalColors } from './../../styles/globals';
import Calendar from 'react-native-calendar';
import Loader from './../Loader/Loader';
import Placeholder from './../Placeholder/Placeholder';

const stylesObjects = {
  container: Object.assign({}, globalStyles.barMargin),
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
  alertText: {
    color: globalColors.primary,
    fontSize: 10
  },
  indicator: Object.assign({}, globalStyles.indicator)
}
const styles = StyleSheet.create(stylesObjects);

const calendarStyle = {
  calendarContainer: {
    backgroundColor: 'white',
    height: 290
  },
  currentDayCircle: {
    backgroundColor: globalColors.secondary
  },
  selectedDayCircle: {
    backgroundColor: globalColors.secondary
  },
  title: {
    fontSize: 12,
    color: 'gray'
  },
  controlButtonText: {
    fontSize: 10,
    color: 'gray'
  },
  dayHeading: {
    fontSize: 10,
    color: 'gray'
  },
  weekendHeading: {
    fontSize: 10
  },
  calendarHeading: {
    borderTopColor: 'whitesmoke',
    borderBottomColor: 'whitesmoke'
  },
  eventIndicator: {
    backgroundColor: globalColors.secondary
  }
};

class AsistenciaPresenter extends Component {
  constructor(props) {
    super(props);
    const today = new Date();
    today.setHours(0,0,0,0)
    this.state = {
      selectedDate: today
    }
  }  

  renderItem(rowData, sectionID, rowID, highlightRow) {
    return (
      <View style={[styles.section, {flexDirection: 'row'}]}>
        <Icon name='event-busy' size={40} color={globalColors.text} />
        <View>
          <Text style={styles.title}>{rowData.subject}</Text>
          <Text style={styles.lightText}>{rowData.date.getHours() <= 11 ? `${rowData.date.getHours()}am` : `${rowData.date.getHours()}pm`}</Text>
          <Text style={styles.subTtile}>{rowData.teacher}</Text>
          <Text style={styles.alertText}>{rowData.justified ? 'Justificada' : 'Injustificada'}</Text>
        </View>
      </View>
    );
  }

  render() {
    const customDayHeadings = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    const customMonthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    const actualInasistencias = this.props.inasistencias
    .filter(i => 
      i.date &&
      i.date.getYear()
    );

    let screen = (<Loader />)
    if (!this.props.loading) {
      const filteredInasistencias = actualInasistencias.filter(i =>       
        i.date.getYear() === this.state.selectedDate.getYear() &&
        i.date.getMonth() === this.state.selectedDate.getMonth() &&
        i.date.getDate() === this.state.selectedDate.getDate()
      );
      
      if (filteredInasistencias.length === 0) {
        screen = (<Placeholder message="No hay inasistencias en el dia seleccionado." />);
      } else {
        const itemsMap = {};
        filteredInasistencias.forEach((i) => {
          itemsMap[i.id] = i;
        });

        const dataSource = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
          sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        screen = (
          <ListView
            enableEmptySections={true}
            dataSource={dataSource.cloneWithRows(itemsMap)}
            renderRow={this.renderItem}
            removeClippedSubviews={false}
          /> 
        );
      }
    }
    return (
      <View style={styles.container} >
        <Calendar
          scrollEnabled={true}
          showControls={true}
          showEventIndicators={true}
          titleFormat={'MMMM YYYY'}
          dayHeadings={customDayHeadings}
          monthNames={customMonthNames}
          prevButtonText={'Ant.'}
          nextButtonText={'Sig.'}
          customStyle={calendarStyle}
          weekStart={1}
          eventDates={actualInasistencias.map(i => i.date)}
          onDateSelect={(date) => {
            this.setState({selectedDate: new Date(date)});
          }}
          selectedDate={this.state.selectedDate}
        />
        {screen} 
      </View>
    );
  }
}

export default AsistenciaPresenter;
