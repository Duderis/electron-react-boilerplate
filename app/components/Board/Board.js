import React, { Component } from 'react';
import styles from './Board.css';
import BigBoard from './BigBoard';
import BoardNav from './BoardNav';

export default class Board extends Component {
  render() {
    return (
      <div className={styles.content}>
        <BoardNav
          teams={this.props.teams}
          boards={this.props.boards}
        />
        <BigBoard
          lanes={this.props.lanes.filter(lane =>
            this.props.board.lanes.findIndex(inner =>
              inner._id === lane._id) > -1)}
        />
      </div>);
  }
}
