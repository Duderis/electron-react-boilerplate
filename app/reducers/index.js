// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import tab from './tab'; import {initialState as tabState} from './tab';
import data from './data'; import {initialState as dataState} from './data';

export default combineReducers({
  router,
  tab,
  data,
});

export const initialStates = {
  dataState,
  tabState
};
