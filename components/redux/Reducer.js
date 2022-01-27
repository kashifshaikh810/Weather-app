import {GET_USERS, GET_USER_DATA, POST_SEARCH} from './ActionTypes';

const initialState = {
  users: null,
  searchCity: '',
  userData: {},
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case POST_SEARCH:
      return {
        ...state,
        searchCity: action.payload,
      };
    case GET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};
