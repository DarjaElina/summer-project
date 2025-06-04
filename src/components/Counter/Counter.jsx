import React from 'react';
import styles from './Counter.module.css';

export default function Counter({ initialValue = 0 }) {
  // For a simple display, we just show the initialValue
  // If you need interactive buttons, we would add useState and event handlers here.

  return (
    <div className={styles.counter}>
      {initialValue}
    </div>
  );
} 