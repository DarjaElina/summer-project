import styles from './PublicEventCard.module.css';
import { useNavigate } from  "react-router-dom";
import { BeatLoader } from "react-spinners";

export default function PublicEventCard({ title, location, date, image_url, emoji, id, weather }) {
  const d = new Date(date);
  const formattedDate = `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })}`;
  const navigate = useNavigate();

  const handleAttend = () => {
    navigate(`/events/public/${id}`);
  };

  return (
    <div className={styles.card}>
      {image_url && (
        <div className={styles.imageWrapper}>
          <img src={image_url} alt={title} className={styles.image} />
          <div className={styles.badge}>{formattedDate}</div>
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{emoji} {title}</h3>
        <p className={styles.location}>📍 <strong>Location:</strong> {location}</p>
         {weather && (
            <div className={styles["event-weather"]}>
              🌤️ <strong>Weather:</strong> {weather.temp}°C,{" "}
              {weather.description}
            </div>
          )}
        <button onClick={handleAttend} className={styles.button}>Attend</button>
      </div>
    </div>
  );
}
