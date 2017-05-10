import {
	MERGE_TIPOS_TAREAS
} from './../actions/actionsTypes';

// Reducer
export default (
  state = [],
  action
) => {
  switch (action.type) {   
    case MERGE_TIPOS_TAREAS: {
      return action.tiposTareas;
    }
    // Intial state
    default: {
      return state;
    }
  }
}

// Selectors
export const getTiposTareas = (state) => {
  return state;
}
