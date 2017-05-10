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

const formatFecha = (fecha) => {
  return `${fecha.getFullYear()}-${fecha.getMonth() < 10 ? '0' + fecha.getMonth() : fecha.getMonth()}-${fecha.getDate() < 10 ? '0' + fecha.getDate() : fecha.getDate()}`;
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
    if (type && type.id !== 0) {
      url = `${url}&activity_type=${type.id}`;
    }
    fetch(url, {
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
      const tareas = responseJson.activities.map(a => Object.assign({},a, {
        //date_limit: a.date_limit !== "" ? new Date(`${m.date_limit.replace(" ","T")}Z`) : null //TODO uncomment after testing
        date_limit: new Date(),   //TODO remove after testing
        studentId: selectedEstudiante.id
      }));
      dispatch(mergeTareas(tareas, selectedEstudiante, fechaInicio, fechaFin));
      resolve(tareas);
    })
    .catch(err => {
      reject(err)
    });  
  });
};

export const mergeTareaComentarios = (id, comentarios) => ({
  type: MERGE_TAREA_COMENTARIOS,
  id,
  comentarios
});

export const fetchTareaComentarios = (selectedEstudiante, id, token) => (dispatch) => { 
  return new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append("token_client", token);
    fetch(`${config.host}/mobile/student/${selectedEstudiante.id}/activity/${id}/message`, {
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
      const comentarios = responseJson.messages.map(m => Object.assign({},m,{
        date: new Date(`${m.date.replace(" ","T")}Z`),
        author: Object.assign({}, m.author, { // TODO remove after image url is correct
          imageUrl: 'https://dl.dropboxusercontent.com/s/tyvxa4lr8v56nj8/pic.jpeg?dl=0'
        })
      }));      
      dispatch(mergeTareaComentarios(id, comentarios));
      resolve(comentarios);
    })
    .catch(err => {
      reject(err)
    });  
  });
};

// Sample data
const today = new Date();
let nextDate = new Date();
nextDate.setDate(nextDate.getDate() + 2);
const data = [
  {
    id: 1,
    name: "Ejercicios de matematica",
    type: {
      id: 1,
      name: "Tarea"
    },
    state: "Asignada",
    date_create: today,
    date_start: today,
    date_limit: today,
    date_end: today,
    date_homework_delivery: today,
    coordinador: "Lic. Juan Perez",
    subject: "Matematicas",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
  },
  {
    id: 2,
    name: "Ejercicios de matematica",
    type: {
      id: 2,
      name: "Leccion"
    },
    state: "Asignada",
    date_create: today,
    date_start: today,
    date_limit: today,
    date_end: today,
    date_homework_delivery: today,
    coordinador: "Lic. Juan Perez",
    subject: "Matematicas",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
  },
  {
    id: 3,
    name: "Ejercicios de matematica",
    type: {
      id: 2,
      name: "Leccion"
    },
    state: "Asignada",
    date_create: nextDate,
    date_start: nextDate,
    date_limit: nextDate,
    date_end: nextDate,
    date_homework_delivery: nextDate,
    coordinador: "Lic. Juan Perez",
    subject: "Matematicas",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
  } 
];

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