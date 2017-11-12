import _ from 'lodash';
import Constants from '../constants/tabs';

export const initialState = {
  activeTab: { id: -1, name: 'teams', type: 'team' },
  openTasks: []
};

export default function tab(state = initialState, action) {
  switch (action.type) {
    case Constants.SWITCH_TAB:
      return { ...state, activeTab: action.tab };
    case Constants.ADD_TAB:
      if (_.find(state.openTasks, action.tab)) return state;
      return { ...state, openTasks: [...state.openTasks, action.tab] };
    case Constants.REMOVE_TAB:
      return {
        ...state,
        openTasks: _.filter(state.openTasks, task => _.isEqual(task, action.tab))
      };
    case Constants.MODIFY_TAB:
      return {
        ...state,
        openTasks: _.map(state.openTasks, (task) => {
          if (task.id === action.id) {
            return {
              id: action.id,
              name: action.name,
              type: 'task'
            };
          }
          return task;
        })
      };
    default:
      return state;
  }
}
