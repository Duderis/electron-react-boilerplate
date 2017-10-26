import React, { Component } from 'react';
import shortid from 'shortid';
import styles from './Board.css';
import Lane from './Lane';
import NewLane from '../../containers/NewLane';

export default class BigBoard extends Component {
  constructor(props) {
    super(props);
    this.drawLanes = this.drawLanes.bind(this);
    this.state = {
      newLane: false
    };
    this.finishField = this.finishField.bind(this);
  }

  drawLanes() {
    const newMap =
    this.props.lanes.map((lane) => (
      <Lane
        key={shortid.generate()}
        lane={lane}
        tasks={this.props.tasks.filter(task =>
          (lane.tasks ? lane.tasks.findIndex((inner) =>
            inner === task._id) > -1 : false))}
      />));
    console.log(newMap);
    return newMap;
  }

  finishField() {
    this.setState({ newLane: false });
  }

  render() {
    if (this.props.board._id) {
      return (
        <div className={styles.bigBoard}>
          {this.drawLanes()}
          {this.state.newLane
            ? (
              <NewLane finishField={this.finishField} />)
            : ''}
          <div onClick={() => this.setState({ newLane: !this.state.newLane })}>
            <i className="fa fa-plus-circle" />
          </div>
        </div>);
    }
    return (<div className={styles.bigBoard} />);
  }
}
