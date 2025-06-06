import React from 'react';
import styles from './Counter.module.css';

export default function Counter({ initialValue = 0 }) {
 
  return (
    <div className={styles.counter}>
      {initialValue}
    </div>
  );
} 