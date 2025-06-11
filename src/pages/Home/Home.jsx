
import styles from "../Home/Home.module.css";
import heroImage from "../../assets/h.JPG";
import { Link, Navigate } from "react-router-dom"; 
import { useEvents } from "../../context/EventContext";
import PublicEventSlider from "../../components/PublicEventSlider/PublicEventSlider";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const {events: publicEvents, loading} = useEvents();
  const { isAuthenticated } = useAuth();
  const stats = [
    { label: "Event Planned ", number: "850 +" },
    { label: "Client Satisfaction ", number: "98 %" },
    { label: "Client Served ", number: "150 +" },
    { number: 8, label: "Awards" },
  ];

  if (isAuthenticated) {
    if (isAuthenticated) {
      return <Navigate to="/events" replace />;
    }
  }
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
      <section>
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

      <section className={styles.upcomingSection}>
        <div className={styles.sectionContent}>
          <h2>✨ Upcoming Events</h2>
          <p>Join in on unforgettable experiences crafted with care and creativity.</p>
          {loading ? (
            <p>Loading public events...</p>
          ) : publicEvents.length === 0 ? (
            <p>No public events available.</p>
          ) : (
            <PublicEventSlider events={publicEvents} />
          )}
        </div>
      </section>
    </div>
  );
}


