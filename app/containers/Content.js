import { connect } from 'react-redux';
import Content from '../components/Content';

function mapStateToProps(state) {
  return {
    activeTab: state.tab.activeTab
  };
}

export default connect(mapStateToProps)(Content);
