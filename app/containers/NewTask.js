import { connect } from 'react-redux';
import NewTask from '../components/Board/NewTask';

function mapStateToProps(state) {
  return { token: state.account.token };
}

export default connect(mapStateToProps)(NewTask);
