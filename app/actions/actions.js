import Constants from '../constants/constants';

const Actions = {
  switchTab: (name,type) => {
    return {
      name: name,
      tabType: type,
      type: Constants.SWITCH_TAB
    }
  },
  loadTeams: (items) => {
    return {
      items: items,
      type: Constants.LOAD_TEAMS
    }
  },
  loadTasks: (items) => {
    return {
      items: items,
      type: Constants.LOAD_TASKS
    }
  },
  loadBoards: (items) => {
    return {
      items: items,
      type: Constants.LOAD_BOARDS
    }
  },
  loadLanes: (items) => {
    return {
      items: items,
      type: Constants.LOAD_LANES
    }
  },
  loadUsers: (items) => {
    return {
      items: items,
      type: Constants.LOAD_USERS
    }
  },
  changeTeam: (item) => {
    return {
      item: item,
      type: Constants.CHANGE_TEAM
    }
  },
  changeTask: (item) => {
    return {
      item: item,
      type: Constants.CHANGE_TASK
    }
  },
  changeBoard: (item) => {
    return {
      item: item,
      type: Constants.CHANGE_BOARD
    }
  },
  changeLane: (item) => {
    return {
      item: item,
      type: Constants.CHANGE_LANE
    }
  },
  changeUser: (item) => {
    return {
      item: item,
      type: Constants.CHANGE_USER
    }
  },

};
export default Actions;
