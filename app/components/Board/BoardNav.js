import React, { Component } from 'react';
import styles from './Board.css';

export default class BoardNav extends Component {
  constructor(props) {
    super(props);
    this.drawBoards = this.drawBoards.bind(this);
  }

  drawTeams(teams) {
    return teams.map((team, index) => (<li key={`${index}brdtm${team._id}`}>{team.name}{team.boards.length > 0
      ? <ul>{this.drawBoards(team.boards)}</ul>
      : ''}
    </li>));
  }

  drawBoards(boards) {
    return boards.map((board, index) => (<li key={`${index}tmbrd${board._id}`}>
      {this.props.boards.find(outerBoard => outerBoard._id === board).name}
    </li>));
  }

  render() {
    return (<div className={styles.listBlock}>
      {this.drawTeams(this.props.teams)}
    </div>);
  }
}
