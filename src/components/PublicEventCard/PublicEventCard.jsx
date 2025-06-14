import styles from './PublicEventCard.module.css';
import { useNavigate } from "react-router-dom";
import { formatInTimeZone } from 'date-fns-tz';
import { parseUTCDateFromDB } from '../../utils/dateHelper';

export default function PublicEventCard({ title, location, date, image_url, emoji, id, weather }) {
  const d = parseUTCDateFromDB(date);
  const formattedDate = `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })}`;
  const dateWithTime = formatInTimeZone(d, 'Europe/Helsinki' , 'd MMMM \'at\' HH:mm');
  const navigate = useNavigate();

  const handleAttend = () => {
    navigate(`/events/public/${id}`);
  };

  const optimizedImageUrl = image_url?.replace('/upload/', '/upload/w_600,f_auto,q_auto:eco/');

  return (
    <div className={styles.card}>
      {image_url && (
        <div className={styles.imageWrapper}>
          <img
            src={optimizedImageUrl}
            srcSet={`
              ${image_url.replace('/upload/', '/upload/w_400,f_auto,q_auto/')} 400w,
              ${image_url.replace('/upload/', '/upload/w_800,f_auto,q_auto/')} 800w
            `}
            sizes="(max-width: 600px) 400px, 800px"
            alt={title}
            className={styles.image}
            width="800"
            height="533"
          />
          <div className={styles.badge}>{formattedDate}</div>
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{emoji} {title}</h3>
        <p className={styles.location}>📍 <strong>Location:</strong> {location}</p>
        <p> 📅 <strong>Date:</strong> {dateWithTime}</p>
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

