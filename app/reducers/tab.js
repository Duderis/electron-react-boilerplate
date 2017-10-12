import Constants from '../constants/constants';

export const initialState = {
  activeTab: {name:"teams",type:"team"},
  openTasks: []
};

export default function tab(state = initialState, action){
    switch (action.type){
      case Constants.SWITCH_TAB:
        return {...state, activeTab: {name:action.name,type:action.tabType}}
      default:
        return state;
    }
}
