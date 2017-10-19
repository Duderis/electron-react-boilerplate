import { connect } from 'react-redux';
import Board from '../components/Board/Board';
import Actions from '../actions/actions';

function mapStateToProps(state) {
  return {
    teams: state.data.teams,
    boards: state.data.boards,
    swimlanes: state.data.swimlanes,
    tasks: state.data.tasks,
    board: state.data.board
  };
}

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
