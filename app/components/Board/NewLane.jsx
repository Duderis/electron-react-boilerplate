import React, { Component } from 'react';
import _ from 'lodash';
import styles from './Board.css';
import { post, put } from '../../utils/requestFunctions';

export default class NewLane extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reloadLanes = this.reloadLanes.bind(this);
    this.reloadBoard = this.reloadBoard.bind(this);
    this.state = {
      name: ''
    };
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  reloadBoard(body, laneBody) {
    const index = _.findIndex(this.props.boards, this.props.board);
    this.props.changeBoard({
      ...this.props.board,
      lanes: [...this.props.board.lanes, laneBody._id]
    });
    this.props.loadBoards([
      ...this.props.boards.slice(0, index),
      body,
      ...this.props.boards.slice(index + 1)
    ]);
  }

  reloadLanes(body) {
    put(
      'board', (err, res, innerBody) => this.reloadBoard(JSON.parse(innerBody), body),
      { ...this.props.board, lanes: [...this.props.board.lanes, body._id] },
      this.props.board.boardId
    );
    this.props.loadLanes([...this.props.lanes, body]);
  }

  handleSubmit(e) {
    e.preventDefault();
    post(
      'lane', (err, res, body) =>
        this.reloadLanes(JSON.parse(body)),
      { name: this.state.name, parentBoard: this.props.board._id }
    );
    this.setState({ name: '' });
    this.props.finishField();
  }

  render() {
    return (
      <div className={styles.lane}>
        <div className={styles.laneTitle}>
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              value={this.state.name}
              type="text"
            />
          </form>
        </div>
      </div>
    );
  }
}
