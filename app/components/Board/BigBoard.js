import React, { Component } from 'react';
import styles from './Board.css';
import Lane from './Lane';

export default class BigBoard extends Component {
  constructor(props) {
    super(props);
    this.drawLanes = this.drawLanes.bind(this);
  }

  drawLanes() {
    this.props.lanes.map((lane) => (
      <Lane
        lane={lane}
        tasks={this.props.tasks.filter(task =>
          lane.tasks.findIndex((inner) =>
            inner === task._id) > -1)}
      />));
  }

  render() {
    return (
      <div className={styles.bigBoard}>
        {this.drawLanes()}
      </div>
    );
  }
}