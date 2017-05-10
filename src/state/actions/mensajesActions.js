import {
	MERGE_MENSAJES,
	MERGE_MENSAJE_COMENTARIOS
} from './actionsTypes';
import config from './../../config/config';

export const mergeMensajes = (mensajes, page) => ({
  type: MERGE_MENSAJES,
  mensajes,
  page
});

export const fetchMensajes = (page, search, userData) => (dispatch) => { 
  return new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append("token_client", userData.token);
    headers.append("Content-Type", "application/json");
    fetch(`${config.host}/mobile/message?search=${search}&offset=${page * 20}&limit=20}`, {
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
      const mensajes = responseJson.messages.map(m => Object.assign({}, m, {
        date: new Date(`${m.date.replace(" ","T")}Z`),
      }));
      dispatch(mergeMensajes(mensajes, page))
      resolve(mensajes)
    })
    .catch(err => {
      reject(err)
    });  
  });
};

export const mergeMensajeComentarios = (id, comentarios) => ({
  type: MERGE_MENSAJE_COMENTARIOS,
  id,
  comentarios
});

export const fetchMensajeComentarios = (id) => (dispatch) => { 
	//TODO call service
  //setTimeout(() => {  
	const comentarios = dataComentatios;
	dispatch(mergeMensajeComentarios(id, comentarios))
  //}, 1000);
};

const data = [
  {
    id: 1,
    subject: 'Entrega de libretas',
    date: new Date(),
    type: 'email',
    body: 'Estimado Daniel, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    author: {
      id: 1,
      name: 'Lic. Juan Perez',
      imageUrl: 'https://dl.dropboxusercontent.com/s/tyvxa4lr8v56nj8/pic.jpeg?dl=0'
    },
  }
]

const dataComentatios = [
  {
    id: 2,
    subject: 'Un comentario',
    date: new Date(),
    type: 'email',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    author: {
      id: 1,
      name: 'Lic. Juan Perez',
      imageUrl: 'https://dl.dropboxusercontent.com/s/tyvxa4lr8v56nj8/pic.jpeg?dl=0'
    }
  }
]