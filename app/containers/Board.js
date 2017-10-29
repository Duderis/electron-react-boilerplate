import { connect } from 'react-redux';
import Board from '../components/Board/Board';
import Actions from '../actions/actions';

function mapStateToProps(state) {
  return {
    teams: state.data.teams,
    team: state.data.team,
    boards: state.data.boards,
    lanes: state.data.swimlanes,
    tasks: state.data.tasks,
    board: state.data.board
  };
}

const mapDispatchToProps = (dispatch) => ({
  changeBoard: (board) => {
    dispatch(Actions.changeBoard(board));
  },
  changeTeam: (team) => {
    dispatch(Actions.changeTeam(team));
  },
  loadUsers: (users) => {
    dispatch(Actions.loadUsers(users));
  },
  loadTeams: (teams) => {
    dispatch(Actions.loadTeams(teams));
  },
  loadBoards: (boards) => {
    dispatch(Actions.loadBoards(boards));
  },
  loadLanes: (items) => {
    dispatch(Actions.loadLanes(items));
  },
  clearBoard: () => {
    dispatch(Actions.clearBoard());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
