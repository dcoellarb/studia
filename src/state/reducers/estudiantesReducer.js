import {
	MERGE_ESTUDIANTES,
} from './../actions/actionsTypes';

// Reducer
export default (
  state = [],
  action
) => {
  switch (action.type) {   
    case MERGE_ESTUDIANTES: {
    	return action.estudiantes
    }
    // Intial state
    default: {
      return state;
    }
  }
}

// Selectors
export const getEstudiantes = (state, context) => {
  return state.filter(e => !context.selectedEstudiante || e.id !== context.selectedEstudiante.id);
}
