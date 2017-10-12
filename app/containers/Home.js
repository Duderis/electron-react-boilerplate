import { connect } from 'react-redux';
import Home from '../components/Home';
import Actions from '../actions/actions';

function mapStateToProps(state) {
  return {
    users: state.data.users,
    activeTab: state.tab.activeTab
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchTab: (name,type) => {
      dispatch(Actions.switchTab(name,type))
    },
    loadUsers: (users) => {
      dispatch(Actions.loadUsers(users))
    },
    loadTeams: (teams) => {
      dispatch(Actions.loadTeams(teams))
    },
    loadBoards: (boards) => {
      dispatch(Actions.loadBoards(boards))
    },
    loadLanes: (lanes) => {
      dispatch(Actions.loadLanes(lanes))
    },
    loadTasks: (tasks) => {
      dispatch(Actions.loadTasks(tasks))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
