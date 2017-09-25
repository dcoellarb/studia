import {
	MERGE_TAREAS,
  MERGE_TAREA_COMENTARIOS
} from './../actions/actionsTypes';

// Reducer
export default (
  state = [],
  action
) => {
  switch (action.type) {   
    case MERGE_TAREAS: {
      const filteredTareas = state.filter(tarea => tarea.studentId !== action.selectedEstudiante.id && tarea.date_limit < action.fechaInicio && tarea.date_limit > action.fechaFin);
      const newState = [...filteredTareas, ...action.tareas];
      return newState.sort((a, b) => new Date(b.date_limit) - new Date(a.date_limit));
    }
    case MERGE_TAREA_COMENTARIOS: {
      const tarea = state.find(t => t.id === action.id);
      const index = state.indexOf(tarea);
      const newTarea = Object.assign({}, tarea, {
        comentarios: action.comentarios
      });
      return [
        ...state.slice(0, index),
        newTarea,
        ...state.slice(index + 1)
      ]
    }
    // Intial state
    default: {
      return state;
    }
  }
}


// Selectors
export const getTareas = (state) => {
  return state;
}

export const getTareaById = (id, state) => {
  return state.find(t => t.id === id);
}

export const getTareasBySelectedStudent = (selectedEstudiante, state) => {
  return state.filter(t => t.studentId === selectedEstudiante.id);
}

export const getTareaComentarios = (id, state) => {
  let comentarios = state.find(t => t.id === id).comentarios;
  if (!comentarios) {
    comentarios = [];
  }
  return comentarios;
}
