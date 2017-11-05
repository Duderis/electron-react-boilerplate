import { connect } from 'react-redux';
import Team from '../components/Team';
import Actions from '../actions/actions';

function mapStateToProps(state) {
  return {
    token: state.account.token,
    teams: state.data.teams,
    team: state.data.team,
    users: state.data.users,
    boards: state.data.boards
  };
}

const mapDispatchToProps = dispatch => ({
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
  clearTeam: () => {
    dispatch(Actions.clearTeam());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Team);
