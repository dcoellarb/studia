import {
	MERGE_PROFILES,
} from './actionsTypes';
import config from './../../config/config';
import { setContextMode } from './contextActions';

export const mergeProfiles = (profiles, page) => ({
  type: MERGE_PROFILES,
  profiles
});

export const fetchProfiles = (userData) => (dispatch) => { 
  return new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append("token_client", userData.token);
    headers.append("Content-Type", "application/json");
    fetch(`${config.host}/mobile/profiles`, {
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
      dispatch(setContextMode(responseJson.profiles[0].id))
      dispatch(mergeProfiles(responseJson.profiles))
      resolve(responseJson.profiles)
    })
    .catch(err => {
      reject(err)
    });  
  });
};
