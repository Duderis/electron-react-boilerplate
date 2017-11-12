import React from 'react';
import styles from './Board.css';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const tab = {
      id: this.props.task.taskId,
      name: this.props.task.name,
      description: this.props.task.description,
      type: 'task'
    };
    this.props.addTab(tab);
    this.props.switchTab(tab);
  }

  render() {
    const { name, description } = this.props.task;
    return (
      <div className={styles.taskBlock} onClick={() => this.handleClick()}>
        <div className={styles.taskTitle}>
          {name}
        </div>
        <div className={styles.taskDescription}>
          {description && description.length >= 50
            ? `${description.slice(0, 50)}...`
            : description}
        </div>
      </div>);
  }
}
