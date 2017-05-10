import {
	MERGE_CALIFICACIONES
} from './actionsTypes';
import config from './../../config/config';

export const mergeCalificaciones = (selectedEstudiante, calificaciones) => ({
  type: MERGE_CALIFICACIONES,
  selectedEstudiante,
  calificaciones
});

export const fetchCalificaciones = (selectedEstudiante, userData) => (dispatch) => { 
  return new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append("token_client", userData.token);
    headers.append("Content-Type", "application/json");
    fetch(`${config.host}/mobile/student/${selectedEstudiante.id}/ratebook`, {
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
      const calificaciones = responseJson.ratebooks.map(c => Object.assign({}, c, { studentId: selectedEstudiante.id }));
      dispatch(mergeCalificaciones(selectedEstudiante, calificaciones))
      resolve(calificaciones);
    })
    .catch(err => {
      reject(err)
    });  
  });
};

const data = [
  {
    id: 1,
    name: "Primer Parcial",
    date: new Date(),
    pdfURL: "https://dl.dropboxusercontent.com/s/oorcyxsyk94m25m/Pago%20Vero%20Medina.pdf?dl=0"
	},
  {
    id: 2,
    name: "Segundo Parcial",
    date: new Date(),
    pdfURL: "https://dl.dropboxusercontent.com/s/oorcyxsyk94m25m/Pago%20Vero%20Medina.pdf?dl=0"
  },
  {
    id: 3,
    name: "Tercer Parcial",
    date: new Date(),
    pdfURL: "https://dl.dropboxusercontent.com/s/oorcyxsyk94m25m/Pago%20Vero%20Medina.pdf?dl=0"
  },
];
