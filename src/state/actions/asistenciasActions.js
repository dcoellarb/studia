import {
	MERGE_INASISTENCIAS,
} from './actionsTypes';
import config from './../../config/config';

export const mergeInasistencias = (selectedEstudiante, inasistencias) => ({
  type: MERGE_INASISTENCIAS,
  selectedEstudiante,
  inasistencias
});

export const fetchInasistencias = (selectedEstudiante, userData) => (dispatch) => {
   return new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append("token_client", userData.token);
    headers.append("Content-Type", "application/json");
    fetch(`${config.host}/mobile/student/${selectedEstudiante.id}/inasistance`, {
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
      const inasistencias = responseJson.Inasistances.map(i => Object.assign({}, i, {
        date: i.date && i.date.length > 0 ? new Date(`${i.date.replace(" ","T")}Z`) : undefined,
        studentId: selectedEstudiante.id
      }));
      dispatch(mergeInasistencias(selectedEstudiante, inasistencias));
      resolve(inasistencias);
    })
    .catch(err => {
      reject(err)
    });  
  });
};

// Sample data
let nextDate = new Date();
nextDate.setDate(nextDate.getDate() + 2);
const data = [
  {
    id: 1,
    date: new Date(),
    subject: 'Matematicas',
    teacher: 'Lic. Juan Perez',
    justified: true
  },
  {
    id: 2,
    date: new Date(),
    subject: 'Ciencias Naturales',
    teacher: 'Lic. Juan Perez',
    justified: false
  },
  {
    id: 3,
    date: nextDate,
    subject: 'Ciencias Naturales',
    teacher: 'Lic. Juan Perez',
    justified: true
  } 
]