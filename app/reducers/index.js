// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import tab, { initialState as tabState } from './tab';
import data, { initialState as dataState } from './data';
import account, { initialState as accountState } from './account';

export default combineReducers({
  router,
  tab,
  data,
  account
});

export const initialStates = {
  dataState,
  tabState,
  accountState
};
