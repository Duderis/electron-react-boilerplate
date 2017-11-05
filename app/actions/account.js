import Constants from '../constants/account';

export const setToken = token => ({
  token,
  type: Constants.SET_TOKEN
});

export const setUser = user => ({
  user,
  type: Constants.SET_USER
});
