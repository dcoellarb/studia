import {
	MERGE_NOTIFICACIONES,
} from './actionsTypes';
import config from './../../config/config';

export const mergeNotificaciones = (notificaciones, page) => ({
  type: MERGE_NOTIFICACIONES,
  notificaciones,
  page
});

export const fetchNotificaciones = (selectedEstudiante, page, search, userData) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append("token_client", userData.token);
    headers.append("Content-Type", "application/json");
    const url = `${config.host}/mobile/student/${selectedEstudiante.id}/messaging/notifications?search=${search}&offset=${page * 20}&limit=20`;
    fetch(url, {
      method: 'get',
      headers: headers
    }) 
    .then(response => {
      if (response.status === 200) {
        return response.json()  
      } else {
        throw `Server error status: ${response.status}`        
      }
    })
    .then(responseJson => { 
      const notificaciones = responseJson.messages.map(m => Object.assign({}, m, {
        date: m.date && m.date.length > 0 ? new Date(`${m.date.replace(" ","T")}Z`) : undefined,
      }));
      dispatch(mergeNotificaciones(notificaciones, page))
      resolve(notificaciones);
    })
    .catch(err => {
      reject(err)
    });  
  });
};
