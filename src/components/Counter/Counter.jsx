import React from 'react';
import styles from './Counter.module.css';

export default function Counter({ initialValue = 0 }) {
  // If you need interactive buttons, we would add useState and event handlers here.
  // For now, it just displays the initial value.
  
  return (
    <div className={styles.counter}>
      {initialValue}
    </div>
  );
}
