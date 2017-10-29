import { connect } from 'react-redux';
import Home from '../components/Home';
import Actions from '../actions/actions';
import * as tabActions from '../actions/tabs';

function mapStateToProps(state) {
  return {
    users: state.data.users,
    activeTab: state.tab.activeTab,
    openTasks: state.tab.openTasks
  };
}

const mapDispatchToProps = dispatch => ({
  switchTab: (tab) => {
    dispatch(tabActions.switchTab(tab));
  },
  removeTab: (tab) => {
    dispatch(tabActions.removeTab(tab));
  },
  loadUsers: (users) => {
    dispatch(Actions.loadUsers(users));
  },
  loadTeams: (teams) => {
    dispatch(Actions.loadTeams(teams));
  },
  loadBoards: (boards) => {
    dispatch(Actions.loadBoards(boards));
  },
  loadLanes: (lanes) => {
    dispatch(Actions.loadLanes(lanes));
  },
  loadTasks: (tasks) => {
    dispatch(Actions.loadTasks(tasks));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
