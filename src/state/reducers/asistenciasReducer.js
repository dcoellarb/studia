import {
	MERGE_INASISTENCIAS,
} from './../actions/actionsTypes';

// Reducer
export default (
  state = [],
  action
) => {
  switch (action.type) {   
    case MERGE_INASISTENCIAS: {
      const filteredInasistencias = state.filter(i => i.id === action.selectedEstudiante.id)
    	return [...filteredInasistencias, ...action.inasistencias]
    }
    // Intial state
    default: {
      return state;
    }
  }
}

// Selectors
export const getInasistencias = (state) => {
  return state;
}

export const getInasistenciasBySelectedEstudiante = (selectedEstudiante, state) => {
  return state.filter(i => i.studentId === selectedEstudiante.id);
}