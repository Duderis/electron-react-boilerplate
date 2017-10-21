import React, { Component } from 'react';
import styles from './Board.css';
import BigBoard from './BigBoard';
import BoardNav from './BoardNav';
import { post, put } from '../../utils/requestFunctions';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(e) {
    this.props.changeBoard({ ...this.props.board, name: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <div>
        <div className={styles.content}>
          <BoardNav
            teams={this.props.teams}
            boards={this.props.boards}
            team={this.props.team}
            board={this.props.board}
            changeTeam={this.props.changeTeam}
            changeBoard={this.props.changeBoard}
          />
          <BigBoard
            lanes={this.props.lanes.filter(lane =>
              this.props.board.lanes.findIndex(inner =>
                inner._id === lane._id) > -1)}
            changeBoard={this.props.changeBoard}
            board={this.props.board}
          />
        </div>
        <div>
          <form>
            <label>Board Name</label>
            <input value={this.props.board.name} />

          </form>

        </div>
      </div>

    );
  }
}
