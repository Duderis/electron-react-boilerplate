import { connect } from 'react-redux';
import Team from '../components/Team';
import Actions from '../actions/actions';

function mapStateToProps(state) {
  return {
    teams: state.data.teams,
    team: state.data.team,
    users: state.data.users
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeTeam: (team) => {
      dispatch(Actions.changeTeam(team))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Team);
