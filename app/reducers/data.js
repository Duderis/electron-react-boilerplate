import Constants from '../constants/constants';

export const initialState = {
  teams: [],
  team: { users: [], boards: [] },
  boards: [],
  board: { name: '', description: '', lanes: [] },
  tasks: [],
  taks: {},
  swimlanes: [],
  swimlane: {},
  localSwimlanes: [],
  users: [],
  user: {}
};

export default function data(state = initialState, action) {
  switch (action.type) {
    case Constants.LOAD_TEAMS:
      return { ...state, teams: action.items };
    case Constants.LOAD_TASKS:
      return { ...state, tasks: action.items };
    case Constants.LOAD_LANES:
      return { ...state, swimlanes: action.items };
    case Constants.LOAD_BOARDS:
      return { ...state, boards: action.items };
    case Constants.LOAD_USERS:
      return { ...state, users: action.items };
    case Constants.CHANGE_TEAM:
      return { ...state, team: { ...state.team, ...action.item } };
    case Constants.CHANGE_TASK:
      return { ...state, task: { ...state.task, ...action.item } };
    case Constants.CHANGE_LANE:
      return { ...state, swimlane: { ...action.item } };
    case Constants.CHANGE_LOCAL_LANES:
      return { ...state, localSwimlanes: [...action.lanes] };
    case Constants.CHANGE_BOARD:
      return { ...state, board: { ...action.item } };
    case Constants.CHANGE_USER:
      return { ...state, user: { ...action.item } };
    case Constants.CLEAR_TEAM:
      return { ...state, team: { users: [], boards: [] } };
    case Constants.CLEAR_TASK:
      return { ...state, task: {} };
    case Constants.CLEAR_LANE:
      return { ...state, swimlane: {} };
    case Constants.CLEAR_BOARD:
      return {
        ...state,
        board: {
          name: '', description: '', lanes: []
        }
      };
    case Constants.CLEAR_USER:
      return { ...state, user: {} };
    default:
      return state;
  }
}
