import styles from "./Home.module.css";
import heroImage from "../assets/h.jpg";
import { Link } from "react-router"; 
import PublicEventCard from "../components/PublicEventCard/PublicEventCard";
import { useEvents } from "../context/EventContext";

export default function Home() {
  const {events: publicEvents, loading} = useEvents();
  const stats = [
    { label: "Event Planned ", number: "850 +" },
    { label: "Client Satisfaction ", number: "98 %" },
    { label: "Client Served ", number: "150 +" },
    { number: 8, label: "Awards" },
  ];
  return (
    <div className={styles.container}>
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
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

      <section style={{ marginTop: "2rem" }}>
        <h2>Public Events</h2>
        {loading ? (
          <p>Loading public events...</p>
        ) : publicEvents.length === 0 ? (
          <p>No public events available.</p>
        ) : (
          publicEvents.map((event) => (
            <PublicEventCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
            />
          ))
        )}
      </section>

      <section style={{ marginTop: "3rem" }}>
        <div>
          <h1>Ready to Create Something</h1>
          <p>
            Let’s discuss how can we bring your vision to life with an
            unforgettable event experience
          </p>
          <Link to="/signup" className={styles.ctaButton}>
            Register
          </Link>
        </div>
      </section>
    </div>
  );
}
