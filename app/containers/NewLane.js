import { connect } from 'react-redux';
import NewLane from '../components/Board/NewLane';
import Actions from '../actions/actions';

function mapStateToProps(state) {
  return {
    token: state.account.token,
    board: state.data.board,
    lanes: state.data.swimlanes,
    boards: state.data.boards
  };
}

const mapDispatchToProps = dispatch => ({
  changeBoard: (board) => {
    dispatch(Actions.changeBoard(board));
  },
  loadLanes: (lanes) => {
    dispatch(Actions.loadLanes(lanes));
  },
  loadBoards: (items) => {
    dispatch(Actions.loadBoards(items));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewLane);
