import React, { Component } from 'react';
import styles from './Board.css';
import Task from './Task';

const drawTasks = tasks =>
  tasks.map((task) =>
    <Task description={task.description} name={task.name} />);

export default class Lane extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
    this.state = {
      name: this.props.lane.name,
      editing: false
    };
  }
  handleChange(e) {
    this.setState({ ...this.state, name: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.update(this.state.name);
    this.setState({ ...this.state, editing: false });
  }
  handleModeChange() {
    this.setState({ ...this.state, editing: !this.state.editing });
  }
  render() {
    return (
      <div className={styles.lane}>
        <div className={styles.laneTitle}>
          {this.state.editing
          ? <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} value={this.state.value} />
          </form>
          : <span onDoubleClick={this.handleModeChange}>{ this.props.lane.name }</span>}
        </div>
        <div className={styles.taskContainer}>{drawTasks(this.props.tasks)}</div>
      </div>
    );
  }
}
