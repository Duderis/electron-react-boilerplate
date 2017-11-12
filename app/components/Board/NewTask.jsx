import React from 'react';
import _ from 'lodash';
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
    const tasks = this.props.lane.tasks || [];
    put(
      'lane', (err, res, innerBody) => {
        this.props.loadLanes(_.map(this.props.lanes, (lane) => {
          if (lane._id === this.props.lane._id) {
            return {
              ...lane,
              tasks: JSON.parse(innerBody).tasks
            };
          }
          return lane;
        }));
        this.props.loadTasks([...this.props.tasks, body]);
      },
      {
        ...this.props.lane,
        tasks: [...tasks, body._id]
      }, this.props.lane.laneId, this.props.token
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    post('task', (err, res, body) => this.updateLane(JSON.parse(body)), {
      ...this.state,
      parentSwimlane: this.props.lane._id
    }, this.props.token);
    this.props.finishField();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Enter new Task name"
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.name}
          />
        </form>
      </div>);
  }
}
