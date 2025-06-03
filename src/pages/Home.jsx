import React from 'react';
import styles from './Home.module.css';
import heroImage from '../assets/h.jpg'; 

export default function Home() {
  const stats = [
    { number: 574, label: 'Data' },
    { number: 327, label: 'Services' },
    { number: 197, label: 'Number of Vists' },
  ];
  return (
    <div className={styles.container}>
      <section className={styles.hero} style={{ backgroundImage: `url(${heroImage})` }}> 
        <div className={styles.heroContent}>
          <h1>Manage your events all year round</h1>
          <p>Helsinki Event Planner</p> 
        </div>
    
        <div className={styles.statsContainer}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}