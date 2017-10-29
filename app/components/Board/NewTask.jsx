import React from 'react';
import styles from './Board.css';
import { post, put } from '../../utils/requestFunctions';

export default class NewTask extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateLane = this.updateLane.bind(this);
    this.state = {
      name: ''
    };
  }

  updateLane(body) {
    console.log(body);
    const tasks = this.props.lane.tasks || [];
    put('lane', (...stuff) => console.log(stuff), {
      ...this.props.lane,
      tasks: [...tasks, body._id]
    }, this.props.lane.laneId);
  }

  handleSubmit(e) {
    e.preventDefault();
    post('task', (err, res, body) => this.updateLane(JSON.parse(body)), {
      ...this.state,
      parentSwimlane: this.props.lane._id
    });
    this.props.finishField();
  }

  render() {
    return (
      <div className={styles.taskBlock}>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.name}
          />
        </form>
      </div>);
  }
}
