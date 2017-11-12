import { connect } from 'react-redux';
import TaskView from '../components/TaskView';
import Actions from '../actions/actions';
import { modifyTab } from '../actions/tabs';

function mapStateToProps(state) {
  return {
    token: state.account.token,
    tasks: state.data.tasks,
    activeTab: state.tab.activeTab
  };
}

const mapDispatchToProps = dispatch => ({
  loadTasks: (items) => {
    dispatch(Actions.loadTasks(items));
  },
  modifyTab: (id, name) => {
    dispatch(modifyTab(id, name));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(TaskView);
