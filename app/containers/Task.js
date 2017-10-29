import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Task from '../components/Board/Task';
import * as actions from '../actions/tabs';

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(null, mapDispatchToProps)(Task);
