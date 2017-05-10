import {
  SET_LOGIN_CONTEXT,
  SET_LOGOUT_CONTEXT,
  SET_CURRENT_COMPONENT,
  HANDLE_CALENDAR_SEARCH_CHANGE,
  HANDLE_NOTIFICACIONES_SEARCH_CHANGE,
  HANDLE_MENSAJES_SEARCH_CHANGE,
  HANDLE_CALENDARIO_FILTRO_CHANGE,
  SET_SELECTED_ESTUDIANTE,
} from './../actions/actionsTypes';

export default (
  state = {
    currentUser: {},
    currentComponent: 'Calendario',
    calendarSearch: '',
    notificacionesSearch: '',
    mensajesSearch: '',
    calendarioFiltro: {id: 0, name: 'Todos'},
  },
  action
) => {
  switch (action.type) {
    case SET_LOGIN_CONTEXT: {
      return Object.assign({}, state, {
        currentUser: action.user
      });
    }
    case SET_LOGOUT_CONTEXT: {
      return Object.assign({}, state, {
        currentUser: {},
        currentComponent: 'Calendario',
        calendarSearch: '',
        notificacionesSearch: '',
        mensajesSearch: '',
        calendarioFiltro: {id: 0, name: 'Todos'},
      });
    }
    case SET_CURRENT_COMPONENT: {
      return Object.assign({}, state, {
        currentComponent: action.componentName
      });
    }
    case HANDLE_CALENDAR_SEARCH_CHANGE: {
      return Object.assign({}, state, {
        calendarSearch: action.text
      });      
    }
    case HANDLE_NOTIFICACIONES_SEARCH_CHANGE: {
      return Object.assign({}, state, {
        notificacionesSearch: action.text
      });      
    }
    case HANDLE_MENSAJES_SEARCH_CHANGE: {
      return Object.assign({}, state, {
        mensajesSearch: action.text
      });      
    }
    case HANDLE_CALENDARIO_FILTRO_CHANGE: {
      return Object.assign({}, state, {
        calendarioFiltro: action.calendarioFiltro
      });      
    }
    case SET_SELECTED_ESTUDIANTE: {
      return Object.assign({}, state, {
        selectedEstudiante: action.selectedEstudiante
      });            
    }
    default: {
      return state;
    }
  }
}

// Selectors
export const getCurrentUser = (state) => {
  return state.currentUser;
}

export const getCurrentComponent = (state) => {
  return state.currentComponent;
}

export const getCalendarSearch = (state) => {
  return state.calendarSearch;
}

export const getNotificacionesSearch = (state) => {
  return state.notificacionesSearch;
}

export const getMensajesSearch = (state) => {
  return state.mensajesSearch;
}

export const getCalendarioFiltro = (state) => {
  return state.calendarioFiltro;
}

export const getSelectedEstudiante = (state) => {
  return state.selectedEstudiante;  
}