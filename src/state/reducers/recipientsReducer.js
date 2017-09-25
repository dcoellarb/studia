import {
	SET_RECIPIENTS,
} from './../actions/actionsTypes';

// Reducer
export default (
  state = [],
  action
) => {
  switch (action.type) {   
    case SET_RECIPIENTS: {
      return action.recipients    	
    }
    // Intial state
    default: {
      return state;
    }
  }
}

// Selectors
export const getRecipients = (state) => {
  return state;
}
