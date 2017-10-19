// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import tab, { initialState as tabState } from './tab';
import data, { initialState as dataState } from './data';

export default combineReducers({
  router,
  tab,
  data,
});

export const initialStates = {
  dataState,
  tabState
};
