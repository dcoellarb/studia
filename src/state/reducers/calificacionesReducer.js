import {
	MERGE_CALIFICACIONES,
} from './../actions/actionsTypes';

// Reducer
export default (
  state = [],
  action
) => {
  switch (action.type) {   
    case MERGE_CALIFICACIONES: {
      const filteredCalificaciones = state.filter(c => c.studentId !== action.selectedEstudiante.id)
    	return [...filteredCalificaciones, ...action.calificaciones];
    }
    // Intial state
    default: {
      return state;
    }
  }
}

// Selectors
export const getCalificaciones = (state) => {
  return state;
}

export const getCalificacionesBySelectedStudent = (selectedEstudiante, state) => {
  return state.filter(c => c.studentId === selectedEstudiante.id);
}
