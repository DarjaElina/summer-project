import React from 'react';
import styles from './Home.module.css';
import heroImage from '../assets/h.jpg';
import { Link } from 'react-router'; 
export default function Home() {
  const stats = [
    { label: 'Event Planned ', number: '850 +' },
    { label: 'Client Satisfaction ', number: '98 %' },
    { label: 'Client Served ', number: '150 +' },
    { number: 8, label: 'Awards' },
  ];
  return (
    <div className={styles.container}>
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${heroImage})` }}>
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
      <section>
        <div>
          <h1>Ready to Create Something</h1>
          <p> Let’s discuss how can we bring your vision to life with an unforgettable
          event experience</p>
          <Link to="/signup" className={styles.ctaButton}>Register</Link>
        </div>
      </section>
    </div>
  );
}




