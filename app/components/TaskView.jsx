import React, { Component } from 'react';
import _ from 'lodash';
import styles from './Team.css';
import { get, put } from '../utils/requestFunctions';

export default class TaskView extends Component {
  constructor(props) {
    super(props);
    this.loadTask = this.loadTask.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.reloadTasks = this.reloadTasks.bind(this);
    this.state = {
      name: '',
      description: '',
      points: '',
      duration: ''
    };
  }

  componentDidMount() {
    get('task', (res, err, body) => this.loadTask(JSON.parse(body)), this.props.activeTab.id);
  }

  componentDidUpdate() {
    if (this.state.taskId !== this.props.activeTab.id) {
      get('task', (res, err, body) => this.loadTask(JSON.parse(body)), this.props.activeTab.id);
    }
  }

  loadTask(task) {
    const newTask = task;
    newTask.description = newTask.description || '';
    newTask.points = newTask.points || -1;
    newTask.duration = newTask.duration || -1;
    this.setState({
      ...task
    });
  }

  reloadTasks(task) {
    this.props.loadTasks(_.map(this.props.tasks, (innerTask) => {
      if (task._id === innerTask._id) {
        return task;
      }
      return innerTask;
    }));
    this.loadTask(task);
  }

  handleSubmit(e) {
    e.preventDefault();
    put('task', (res, err, body) => this.reloadTasks(JSON.parse(body)), this.state, this.props.activeTab.id);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={styles.content}>

          <div className={styles.contentColumn}>
            <label>Name</label>
            <input
              name="name"
              onChange={this.handleInputChange}
              value={this.state.name}
            />
            <label>Description</label>
            <textarea
              name="description"
              onChange={this.handleInputChange}
              value={this.state.description}
            />
          </div>
          <div className={styles.contentColumn}>
            <label>Points</label>
            <input
              name="points"
              onChange={this.handleInputChange}
              value={this.state.points}
            />
            <label>Time</label>
            <input
              name="duration"
              onChange={this.handleInputChange}
              value={this.state.duration}
            />
            <button type="submit" className={styles.btn}>Save</button>
          </div>
          <div className={styles.contentColumn}>
            <div>{`Created by:${this.state.createdBy || '-'}`}</div>
            <div>{`Belongs to:${this.state.parentBoard || '-'} board`}</div>
          </div>

        </div>
      </form>
    );
  }
}
