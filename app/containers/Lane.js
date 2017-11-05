import { connect } from 'react-redux';
import Lane from '../components/Board/Lane';

function mapStateToProps(state) {
  return { token: state.account.token };
}

export default connect(mapStateToProps)(Lane);
