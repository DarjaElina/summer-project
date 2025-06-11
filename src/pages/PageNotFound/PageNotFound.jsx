import React from "react";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>4😮4</h1>
        <p className={styles.message}>
          Sorry, the endpoint you are trying to access is not in our system.
        </p>
        <a href="/" className={styles.button}>
          Go Back Home
        </a>
      </div>
    </div>
  );
}
