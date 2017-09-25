import {
  MERGE_TIPOS_TAREAS
} from './actionsTypes';
import config from './../../config/config';

export const mergeTiposTareas = (tiposTareas) => ({
  type: MERGE_TIPOS_TAREAS,
  tiposTareas
});

export const fetchTiposTareas = (selectedEstudiante, userData) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append("token_client", userData.token);
    headers.append("Content-Type", "application/json");
    fetch(`${config.host}/mobile/student/${selectedEstudiante.id}/activity_types`, {
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
      const tiposTareas = responseJson.activity_types;
      dispatch(mergeTiposTareas(tiposTareas));
      resolve(tiposTareas)
    })
    .catch(err => {
      reject(err);
    });
  });
};

// Sample data
const data = [
  {
    id: 1,
    name: "Tarea"
  },
  {
    id: 2,
    name: "Leccion"
  }
];