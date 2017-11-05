import _ from 'lodash';
import Constants from '../constants/tabs';

export const initialState = {
  token: '',
  user: {
    username: '',
    password: ''
  }
};

export default function tab(state = initialState, action) {
  switch (action.type) {
    case Constants.SET_TOKEN:
      return { ...state, token: action.token };
    case Constants.SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}
