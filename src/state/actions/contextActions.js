import { AsyncStorage } from 'react-native';
import {
	SET_LOGIN_CONTEXT,
	SET_LOGOUT_CONTEXT,
  SET_CURRENT_COMPONENT,
  HANDLE_CALENDAR_SEARCH_CHANGE,
  HANDLE_NOTIFICACIONES_SEARCH_CHANGE,
  HANDLE_MENSAJES_SEARCH_CHANGE,
  HANDLE_CALENDARIO_FILTRO_CHANGE,
  SET_SELECTED_ESTUDIANTE
} from './actionsTypes';
import config from './../../config/config';

export const setLoginContext = (user) => ({
  type: SET_LOGIN_CONTEXT,
  user
});

export const getLoginContext = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('@Studia:user')
    .then(
      value => {
        dispatch(setLoginContext(JSON.parse(value)));
        resolve(value);
      },
      error => {
        reject(error);    
      }
    );
  }); 
};

export const changeProfile = (profile, userData) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const updatedUserData = Object.assign({}, userData, { mode: profile.name });
    AsyncStorage.setItem('@Studia:user', JSON.stringify(updatedUserData))
    .then(
      () => {
        dispatch(setLoginContext(updatedUserData))  
        resolve();
      },
      (errpr) => {
        reject(error);
      },      
    )
  });  
}

export const login = (username, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let userData;

    const loginHeaders = new Headers();
    loginHeaders.append("Content-Type", "application/json");
    loginHeaders.append("token_client", "117df1d290b3e9004556f1138dc1428f390035e35cf7f5f67da508e86dc5d59c");
    loginBdoy = JSON.stringify({username, password});
    fetch(`${config.host}/mobile/authenticate`, {
      method: 'post',
      headers: loginHeaders,
      body: loginBdoy
    }) 
    .then(response => {
      if (response.status === 200) {
        return response.json()  
      } else {
        reject({code: response.status, msg: "Server Errror"});
      }      
    })
    .then(responseJson => {
      userData = Object.assign({}, responseJson, { mode: 'student' }); // TODO remove once fixed
      return AsyncStorage.setItem('@Studia:user', JSON.stringify(userData));
    })
    .then(() => {
      dispatch(setLoginContext(userData));
      resolve(userData);              
    })
    .catch(err => {      
      reject(err);
    });
  });
};

export const setLogoutContext = () => ({
  type: SET_LOGOUT_CONTEXT
});

export const logout = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem('@Studia:user')
    .then(
      () => {
        dispatch(setLogoutContext());
        resolve();
      },
      (errpr) => {
        reject(error);
      },      
    );
  });
};

export const setCurrentComponent = (componentName) => ({
  type: SET_CURRENT_COMPONENT,
  componentName
});

export const handleCalendarSearchChange = (text) => ({
  type: HANDLE_CALENDAR_SEARCH_CHANGE,
  text
});

export const handleNotificacionesSearchChange = (text) => ({
  type: HANDLE_NOTIFICACIONES_SEARCH_CHANGE,
  text
});

export const handleMensajesSearchChange = (text) => ({
  type: HANDLE_MENSAJES_SEARCH_CHANGE,
  text
});

export const handleCalendarioFiltroChange = (calendarioFiltro) => ({
  type: HANDLE_CALENDARIO_FILTRO_CHANGE,
  calendarioFiltro
});

export const setSelectedEstudiante = (selectedEstudiante) => ({
  type: SET_SELECTED_ESTUDIANTE,
  selectedEstudiante
});