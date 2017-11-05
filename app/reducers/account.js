import _ from 'lodash';
import Constants from '../constants/account';

export const initialState = {
  token: '',
  user: {
    username: '',
    password: ''
  }
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case Constants.SET_TOKEN:
      console.log(action.token);
      return { ...state, token: action.token };
    case Constants.SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}
