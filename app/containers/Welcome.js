import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Welcome from '../components/Welcome';
import * as actions from '../actions/account';

const mapStateToProps = state => ({
  user: state.account.user
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
