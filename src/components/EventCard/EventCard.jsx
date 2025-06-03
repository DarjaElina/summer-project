import style from "./EventCard.module.css";

export default function EventCard({ title, description, location, date, imageUrl, emoji, weather }) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "long" });
  const formattedDate = `${day} ${month}`;

  return (
    <div className={style["event-card"]}>
      {imageUrl && (
        <div className={style["event-image"]}>
          <img src={imageUrl} alt={title} />
          <div className={style["date-badge"]}>{formattedDate}</div>
        </div>
      )}
      <div className={style["event-content"]}>
        <h2>{emoji} {title}</h2>
        <p><strong>Date:</strong> {formattedDate}</p>
        <p><strong>Location:</strong> {location}</p>
        <p>{description}</p>

        {weather && (
          <div className={style["event-weather"]}>
            🌤️ <span><strong>Weather:</strong> {weather.temp}°C, {weather.description}</span>
          </div>
        )}
      </div>
    </div>
  );
}

