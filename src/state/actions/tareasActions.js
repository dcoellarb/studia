import {
  MERGE_TAREAS,
  MERGE_TAREA_COMENTARIOS
} from './actionsTypes';
import config from './../../config/config';

export const mergeTareas = (tareas, selectedEstudiante, fechaInicio, fechaFin) => ({
  type: MERGE_TAREAS,
  tareas,
  selectedEstudiante,
  fechaInicio,
  fechaFin
});

export const mergeTareaComentarios = (id, comentarios) => ({
  type: MERGE_TAREA_COMENTARIOS,
  id,
  comentarios
});

const formatFecha = (fecha) => {
  return `${fecha.getFullYear()}-${fecha.getMonth() + 1 < 10 ? `0${fecha.getMonth() + 1}` : `${fecha.getMonth() + 1}`}-${fecha.getDate() < 10 ? '0' + fecha.getDate() : fecha.getDate()}`;
}

export const fetchTareas = (selectedEstudiante, fechaInicio, fechaFin, search, type, userData) => (dispatch) => { 
  return new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append("token_client", userData.token);
    headers.append("Content-Type", "application/json");
    const fechaInicioString = formatFecha(fechaInicio);
    const fechaFinString = formatFecha(fechaFin);
    let url = `${config.host}/mobile/student/${selectedEstudiante.id}/activity?date_from=${fechaInicioString}&date_to=${fechaFinString}`;
    if (search && search.length > 0) {
      url = `${url}&search=${search}`;
    }
    if (type && type !== 'Todos') {
      url = `${url}&activity_type=${type}`;
    }
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
      let tareas = []
      if (responseJson && responseJson.activities) {
        tareas = responseJson.activities.map(a => Object.assign({},a, {
          //date_limit: a.date_limit !== "" ? new Date(`${m.date_limit.replace(" ","T")}Z`) : null //TODO uncomment after testing
          date_limit: new Date(),   //TODO remove after testing
          studentId: selectedEstudiante.id
        }));  
      }
      dispatch(mergeTareas(tareas, selectedEstudiante, fechaInicio, fechaFin));
      resolve(tareas);
    })
    .catch(err => {
      reject(err)
    });  
  });
};

export const insertComentarioTarea = (selectedEstudiante, tarea, text, userData) => (dispatch) => { 
  return new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append("token_client", userData.token);
    headers.append("Content-Type", "application/json");
    const today = new Date();
    const body = {
      body: text,
      date: formatFecha(today),
      type: 'comment'
    };
    let url = `${config.host}/mobile/student/${selectedEstudiante.id}/activity/${tarea.id}/message`;
    fetch(url, {
      method: 'post',
      headers: headers,
      body: JSON.stringify(body),
    }) 
    .then(response => {
      if (response.status === 201) {
        const updatedBody = Object.assign({}, body, {
          date: today,
          author: selectedEstudiante,
        })
        dispatch(mergeTareaComentarios(tarea.id, [updatedBody, ...tarea.comentarios]));
        resolve(body);
      } else {
        throw `Server error status: ${response.status}`
      }
    })
    .catch(err => {
      reject(err)
    });  
  });
};

export const fetchTareaComentarios = (selectedEstudiante, id, userData) => (dispatch) => { 
  return new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append("token_client", userData.token);
    headers.append("Content-Type", "application/json");
    const url = `${config.host}/mobile/student/${selectedEstudiante.id}/activity/${id}/message`;
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
      const comentarios = responseJson.messages.map(m => Object.assign({},m,{
        date: new Date(`${m.date.replace(" ","T")}Z`),
        author: Object.assign({}, m.author)
      }));      
      dispatch(mergeTareaComentarios(id, comentarios));
      resolve(comentarios);
    })
    .catch(err => {
      reject(err)
    });  
  });
};
