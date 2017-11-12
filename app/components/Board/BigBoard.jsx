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
    this.props.loadLanes(_.map(this.props.lanes, (lane) => {
      if (laneId === lane.laneId) {
        return { ...lane, name };
      }
      return lane;
    }));
  }

  drawLanes() {
    const newMap = _.map((this.props.board.lanes.length > 0 ? _.filter(this.props.lanes, lane =>
      _.findIndex(this.props.board.lanes, inner =>
        inner === lane._id) > -1) : []), lane => (
          <Lane
            key={shortid.generate()}
            lane={lane}
            update={this.handleLaneChange}
            tasks={_.filter(this.props.tasks, task =>
              (lane.tasks ? _.findIndex(lane.tasks, inner =>
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
    if (!taskArr.length) {
      return '';
    }
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
          {this.renderUnassigned()}
          <div
            onClick={() => this.setState({ newLane: !this.state.newLane })}
            style={{ width: '10px' }}
          >
            <i className={this.state.newLane ? 'fa fa-minus-circle' : 'fa fa-plus-circle'} />
          </div>
        </div>);
    }
    return (
      <div className={styles.bigBoard}>
        <span className={styles.bigMessage}>
          No Board selected
        </span>
      </div>);
  }
}
