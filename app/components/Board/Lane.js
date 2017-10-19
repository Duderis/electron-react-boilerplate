import React from 'react';
import styles from './Board.css';
import Task from './Task';

const drawTasks = tasks =>
  tasks.map((task) =>
    <Task description={task.description} name={task.name} />);

export default props => (
  <div className={styles.lane}>
    <div className={styles.laneTitle}>{ props.lane.name }</div>
    <div className={styles.taskContainer}>{drawTasks(props.tasks)}</div>
  </div>
);
