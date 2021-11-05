import { combineReducers } from 'redux';

import { 
SET_MOVIES,
SET_FILTER,
SET_USER,
UPDATE_USER
} from '../actions/actions';

//reducers movies

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}


//reducers users

function users(state = [], action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

function updateUsers(state = [], action) {
  switch (action.type) {
    case UPDATE_USER:
      return action.value;
    default:
      return state;
  }
}

//combine-reducer

const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    users,
    updateUsers
  });

export default moviesApp;