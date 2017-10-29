import React, { Component } from 'react';
import shortid from 'shortid';
import _ from 'lodash';
import styles from './Board.css';
import Task from '../../containers/Task';
import { put } from '../../utils/requestFunctions';
import NewTask from './NewTask';

const drawTasks = tasks => _.map(tasks, task =>
  <Task key={shortid.generate()} task={task} />);

export default class Lane extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
    this.finishField = this.finishField.bind(this);
    this.state = {
      name: this.props.lane.name,
      editing: false,
      newTask: false
    };
  }
  handleChange(e) {
    this.setState({ ...this.state, name: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    put('lane', () => { }, { ...this.props.lane, name: this.state.name }, this.props.lane.laneId);
    this.props.update(this.state.name, this.props.lane.laneId);
    this.setState({ ...this.state, editing: false });
  }
  handleModeChange() {
    this.setState({ ...this.state, editing: !this.state.editing });
  }

  finishField() {
    this.setState({ newTask: false });
  }

  render() {
    return (
      <div className={styles.lane}>
        <div className={styles.laneTitle}>
          {this.state.editing
          ? (
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.handleChange} value={this.state.name} />
            </form>)
          : <span onDoubleClick={this.handleModeChange}>{ this.props.lane.name }</span>}
        </div>
        <div className={styles.taskContainer}>
          {drawTasks(this.props.tasks)}
          {this.state.newTask
            ? <NewTask
              finishField={this.finishField}
              lane={this.props.lane}
            />
            : ''}
          {this.props.unnasigned
              ? ''
              : (
                <div onClick={() => this.setState({ newTask: !this.state.newTask })}>
                  <i className="fa fa-plus-circle" />
                </div>)}
        </div>
      </div>
    );
  }
}
