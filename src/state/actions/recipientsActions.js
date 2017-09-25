import {
	SET_RECIPIENTS,
} from './actionsTypes';
import config from './../../config/config';

export const setRecipients = (recipients) => ({
  type: SET_RECIPIENTS,
  recipients,
});

export const fetchRecipients = (selectedEstudiante, search, userData) => (dispatch) => { 
  return new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append("token_client", userData.token);
    headers.append("Content-Type", "application/json");
    const url = `${config.host}/mobile/student/${selectedEstudiante.id}/messaging/recipients?search=${search}&offset=0&limit=5`
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
      dispatch(setRecipients(responseJson.recipients))
      resolve(responseJson.recipients)      
    })
    .catch(err => {
      reject(err)
    });  
  });
};
