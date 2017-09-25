import {
	MERGE_MENSAJES,
  MERGE_MENSAJE_COMENTARIOS
} from './../actions/actionsTypes';

// Reducer
export default (
  state = [],
  action
) => {
  switch (action.type) {   
    case MERGE_MENSAJES: {
      if (action.page === 0) {
        return action.mensajes
      } else {
        return [...state, ...action.mensajes]
      }
    	
    }
    case MERGE_MENSAJE_COMENTARIOS: {
      const message = state.find(m => m.id === action.id);
      const index = state.indexOf(message);
      const newMessage = Object.assign({}, message, {
        childs: action.comentarios
      });
      return [
        ...state.slice(0, index),
        newMessage,
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
export const getMensajes = (state) => {
  return state;
}

export const getMensajeComentarios = (id, state) => {
  return state.find(m => m.id === id);
}
