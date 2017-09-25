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

export const fetchMensajes = (selectedEstudiante, page, search, userData) => (dispatch) => { 
  return new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append("token_client", userData.token);
    headers.append("Content-Type", "application/json");
    const url = `${config.host}/mobile/student/${selectedEstudiante.id}/messaging/messages?search=${search}&offset=${page * 20}&limit=20`;
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
      const mensajes = responseJson.messages.map(m => Object.assign({}, m, {
        date: new Date(`${m.date.replace(" ","T")}Z`),
        childs: m.childs
        ? m.childs.map(cm => Object.assign({}, cm, {
          date: new Date(`${cm.date.replace(" ","T")}Z`),
        }))
        : []
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
	// const comentarios = dataComentatios;
	// dispatch(mergeMensajeComentarios(id, comentarios))
  //}, 1000);
};

export const createMessage = (selectedEstudiante, subject, recipients, text, userData) => (dispatch) => { 
  return new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append("token_client", userData.token);
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify({
      subject: subject,
      recipients: recipients.map(recipient => recipient.id),
      body: text
    });
    fetch(`${config.host}/mobile/student/${selectedEstudiante.id}/messaging`, {
      method: 'post',
      headers: headers,
      body: body
    }) 
    .then(response => {
      if (response.status === 201) {
        resolve();
      } else {
        throw `Server error status: ${response.status}`
      }      
    })
    .catch(err => {
      reject(err);
    });
  });
};

export const insertComentarioMessage = (selectedEstudiante, message, text, userData) => (dispatch) => { 
  return new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append("token_client", userData.token);
    headers.append("Content-Type", "application/json");
    const body = {
      body: text,   
      date: new Date(),   
      subject: message.subject,
      recipients: [message.author.id]
    };
    let url = `${config.host}/mobile/student/${selectedEstudiante.id}/messaging/messages/${message.id}`;
    fetch(url, {
      method: 'post',
      headers: headers,
      body: JSON.stringify(body),
    }) 
    .then(response => {
      if (response.status === 201) {        
        const updatedComment = Object.assign({}, body, {
          type: 'comment',
          author: selectedEstudiante
        });
        dispatch(mergeMensajeComentarios(message.id, [updatedComment, ...message.childs]));
        resolve(updatedComment);
      } else {
        throw `Server error status: ${response.status}`
      }
    })
    .catch(err => {
      reject(err)
    });  
  });
};

