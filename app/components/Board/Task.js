import React from 'react';
import styles from './Board.css';

export default props => (
  <div className={styles.taskBlock}>
    <div className={styles.taskTitle}>
      {props.name}
    </div>
    <div className={styles.taskDescription}>
      {props.description.length >= 50
        ? props.description.slice(0, 50)
        : props.description}
    </div>
  </div>);
