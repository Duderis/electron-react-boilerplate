// @flow
import React, { Component } from 'react';
import shortid from 'shortid';
import _ from 'lodash';
import styles from './Board.css';
import Lane from '../../containers/Lane';
import NewLane from '../../containers/NewLane';

export default class BigBoard extends Component {
  constructor(props: Object) {
    super(props);
    this.drawLanes = this.drawLanes.bind(this);
    this.state = {
      newLane: false
    };
    this.finishField = this.finishField.bind(this);
    this.handleLaneChange = this.handleLaneChange.bind(this);
    this.renderUnassigned = this.renderUnassigned.bind(this);
  }

  drawLanes: Function;
  finishField: Function;
  handleLaneChange: Function;

  handleLaneChange(name, laneId) {
    this.props.loadLanes(this.props.lanes.map((lane) => {
      if (laneId === lane.laneId) {
        return { ...lane, name };
      }
      return lane;
    }));
  }

  drawLanes() {
    const newMap = (this.props.board.lanes.length > 0 ? this.props.lanes.filter(lane =>
      this.props.board.lanes.findIndex(inner =>
        inner === lane._id) > -1) : []).map(lane => (
          <Lane
            key={shortid.generate()}
            lane={lane}
            update={this.handleLaneChange}
            tasks={this.props.tasks.filter(task =>
              (lane.tasks ? lane.tasks.findIndex(inner =>
                inner === task._id) > -1 : false))}
          />));
    return newMap;
  }

  finishField() {
    this.setState({ newLane: false });
  }

  renderUnassigned() {
    const taskArr = _.filter(this.props.task, {
      parentBoard: this.props.board._id,
      parentSwimlane: null
    });
    return (
      <Lane
        lane={{
          name: 'unnassigned lane'
        }}
        unnasigned
        tasks={taskArr}
      />
    );
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
          {this.renderUnassigned()}
        </div>);
    }
    return (<div className={styles.bigBoard} />);
  }
}
