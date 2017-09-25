import {
	MERGE_ESTUDIANTES,
} from './actionsTypes';
import * as contextActions from './contextActions';
import config from './../../config/config';

export const mergeEstuadiantes = (estudiantes) => ({
  type: MERGE_ESTUDIANTES,
  estudiantes
});

export const fetchEstudiantes = (userData) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append("token_client", userData.token);
    headers.append("mode", userData.mode);
    fetch(`${config.host}/mobile/student`, {
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
    .then(responseJSON => {
      dispatch(contextActions.setSelectedEstudiante(responseJSON.students[0]));
      dispatch(mergeEstuadiantes(responseJSON.students));
      resolve(responseJSON.students);
    })        
    .catch(err => {
      reject(err)
    });  
  });
};

// Sample data
const data = [
  {
    id: 1,
    name: 'Daniel Coellar',
    email: 'dcoellar@gmail.com',
    imageUrl: 'https://dl.dropboxusercontent.com/s/tyvxa4lr8v56nj8/pic.jpeg?dl=0'
  },
  {
    id: 2,
    name: 'Pedro Coellar',
    email: 'pcoellar@gmail.com',    
    imageUrl: 'https://dl.dropboxusercontent.com/s/tyvxa4lr8v56nj8/pic.jpeg?dl=0'
  },
  {
    id: 3,
    name: 'Xavier Coellar',
    email: 'xcoellar@gmail.com',    
    imageUrl: 'https://dl.dropboxusercontent.com/s/tyvxa4lr8v56nj8/pic.jpeg?dl=0'
  },
  {
    id: 4,
    name: 'Luis Coellar',
    email: 'lcoellar@gmail.com',    
    imageUrl: 'https://dl.dropboxusercontent.com/s/tyvxa4lr8v56nj8/pic.jpeg?dl=0'
  }
]