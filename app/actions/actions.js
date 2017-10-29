import Constants from '../constants/constants';

const Actions = {
  switchTab: (name, type) => ({
    name,
    tabType: type,
    type: Constants.SWITCH_TAB
  }),
  loadTeams: items => ({
    items,
    type: Constants.LOAD_TEAMS
  }),
  loadTasks: items => ({
    items,
    type: Constants.LOAD_TASKS
  }),
  loadBoards: items => ({
    items,
    type: Constants.LOAD_BOARDS
  }),
  loadLanes: items => ({
    items,
    type: Constants.LOAD_LANES
  }),
  loadUsers: items => ({
    items,
    type: Constants.LOAD_USERS
  }),
  changeTeam: item => ({
    item,
    type: Constants.CHANGE_TEAM
  }),
  changeTask: item => ({
    item,
    type: Constants.CHANGE_TASK
  }),
  changeBoard: item => ({
    item,
    type: Constants.CHANGE_BOARD
  }),
  changeLane: item => ({
    item,
    type: Constants.CHANGE_LANE
  }),
  changeLocalLanes: items => ({
    items,
    type: Constants.CHANGE_LOCAL_LANES
  }),
  changeUser: item => ({
    item,
    type: Constants.CHANGE_USER
  }),
  clearTeam: () => ({
    type: Constants.CLEAR_TEAM
  }),
  clearTask: () => ({
    type: Constants.CLEAR_TASK
  }),
  clearBoard: () => ({
    type: Constants.CLEAR_BOARD
  }),
  clearLane: () => ({
    type: Constants.CLEAR_LANE
  }),
  clearUser: () => ({
    type: Constants.CLEAR_USER
  })
};
export default Actions;
