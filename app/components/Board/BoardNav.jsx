import React, { Component } from 'react';
import shortid from 'shortid';
import styles from './Board.css';
import _ from 'lodash';

export default class BoardNav extends Component {
  constructor(props) {
    super(props);
    this.drawBoards = this.drawBoards.bind(this);
    this.drawTeams = this.drawTeams.bind(this);
    this.selectedName = styles.selected;
  }

  drawTeams(teams) {
    return teams.map((team) => (
      <li
        onClick={() => this.props.changeTeam(team)}
        key={shortid.generate()}
        className={this.props.team._id === team._id
          ? this.selectedName
          : ''}
      >{team.name}{team.boards.length > 0
      ? <ul>{this.drawBoards(team.boards)}</ul>
      : ''}
      </li>));
  }

  drawBoards(boards) {
    return boards.map((board) => (
      <li
        key={shortid.generate()}
        onClick={() => this.props.changeBoard(_.find(this.props.boards, { _id: board }))}
        className={(this.props.board._id === board) && this.props.board._id
          ? this.selectedName
          : ''}
      >
        {this.props.boards.find(outerBoard => outerBoard._id === board).name}
      </li>));
  }

  render() {
    return (<div className={styles.listBlock}>
      {this.drawTeams(this.props.teams)}
    </div>);
  }
}
