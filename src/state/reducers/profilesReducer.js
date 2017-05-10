import {
  MERGE_PROFILES,
} from './../actions/actionsTypes';

// Reducer
export default (
  state = [],
  action
) => {
  switch (action.type) {   
    case MERGE_PROFILES: {
      return action.profiles
    }
    // Intial state
    default: {
      return state;
    }
  }
}

// Selectors
export const getProfiles = (state, context) => {
  return state;
}
