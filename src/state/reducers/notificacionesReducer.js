import {
	MERGE_NOTIFICACIONES
} from './../actions/actionsTypes';

// Reducer
export default (
  state = [],
  action
) => {
  switch (action.type) {   
    case MERGE_NOTIFICACIONES: {
      if (action.page === 0) {
        return action.notificaciones
      } else {
        return [...state, ...action.notificaciones]
      }
    }
    // Intial state
    default: {
      return state;
    }
  }
}

// Selectors
export const getNotificaciones = (state) => {
  return state;
}
