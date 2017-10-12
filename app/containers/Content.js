import { connect } from 'react-redux';
import Content from '../components/Content';
import Actions from '../actions/actions';

function mapStateToProps(state) {
  return {
    activeTab: state.tab.activeTab
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
