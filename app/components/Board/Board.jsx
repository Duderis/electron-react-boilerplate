import React, { Component } from 'react';
import _ from 'lodash';
import styles from './Board.css';
import styles2 from '../Team.css';
import BigBoard from './BigBoard';
import BoardNav from './BoardNav';
import { post, put } from '../../utils/requestFunctions';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reloadBoard = this.reloadBoard.bind(this);
    this.loadNewBoard = this.loadNewBoard.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
  }

  handleInputChange(e) {
    this.props.changeBoard({ ...this.props.board, name: e.target.value });
  }

  handleDescChange(e) {
    this.props.changeBoard({ ...this.props.board, description: e.target.value });
  }

  reloadBoard(body) {
    const { boards, board } = this.props;
    const index = _.findIndex(boards, innerBoard => innerBoard._id === body._id);
    this.props.loadBoards([...boards.slice(0, index),
      { ...boards[index], ...body },
      ...boards.slice(index + 1)]);
    this.props.changeBoard({ ...board, ...body });
  }

  loadNewBoard(body) {
    const { boards, board } = this.props;
    this.props.loadBoards([...boards, body]);
    this.props.changeBoard({ ...board, ...body });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.board._id) {
      put('board', (err, res, body) => this.reloadBoard(JSON.parse(body)), this.props.board, this.props.board.boardId, this.props.token);
    } else {
      post('board', (err, res, body) => this.loadNewBoard(JSON.parse(body)), this.props.board, this.props.token);
    }
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
            lanes={this.props.lanes}
            changeBoard={this.props.changeBoard}
            board={this.props.board}
            tasks={this.props.tasks}
            loadLanes={this.props.loadLanes}
          />
        </div>
        <div className={styles.formBlock}>
          <form onSubmit={this.handleSubmit} className={styles.formInnerBlock}>
            <div className={styles2.clearButton} onClick={this.props.clearBoard}>Clear</div>
            <label className={styles2.label}>Board Name:</label>
            <input
              type="text"
              value={this.props.board.name}
              onChange={this.handleInputChange}
              placeholder="Enter Board name"
            />
            <label className={styles2.label}>Board Description:</label>
            <textarea
              placeholder="Enter Board description"
              value={this.props.board.description}
              onChange={this.handleDescChange}
            />
            <button type="submit" className={styles2.btn}>Save</button>
          </form>
        </div>
      </div>
    );
  }
}
