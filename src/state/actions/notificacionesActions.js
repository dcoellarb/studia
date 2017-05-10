import {
	MERGE_NOTIFICACIONES,
} from './actionsTypes';
import config from './../../config/config';

export const mergeNotificaciones = (notificaciones, page) => ({
  type: MERGE_NOTIFICACIONES,
  notificaciones,
  page
});

export const fetchNotificaciones = (page, search, userData) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append("token_client", userData.token);
    headers.append("Content-Type", "application/json");
    fetch(`${config.host}/mobile/notification?search=${search}&offset=${page * 20}&limit=20}`, {
      method: 'get',
      headers: headers
    }) 
    .then(response => {
      if (response.status === 200) {
        return response.json()  
      } else {
        reject({code: response.status, error: 'Server error'})
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

const data = [
	{
		id: 1,
    subject: 'Entrega de libretas',
    date: new Date(),
    type: 'notification',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    author: {
      id: 1,
      name: 'Lic. Juan Perez',
      imageUrl: 'https://dl.dropboxusercontent.com/s/tyvxa4lr8v56nj8/pic.jpeg?dl=0'
    }
	}
]