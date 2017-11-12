import { connect } from 'react-redux';
import Actions from '../actions/actions';
import NewTask from '../components/Board/NewTask';

const mapStateToProps = state => ({
  token: state.account.token,
  tasks: state.data.tasks,
  lanes: state.data.swimlanes
});

const mapDispatchToProps = dispatch => ({
  loadLanes: (lanes) => {
    dispatch(Actions.loadLanes(lanes));
  },
  loadTasks: (tasks) => {
    dispatch(Actions.loadTasks(tasks));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);
