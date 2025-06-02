
export default function EventCard({ title, description, location, date, imageUrl, emoji, weather }) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "long" });
  const formattedDate = `${day} ${month}`;

  return (
    <div className="event-card">
      {imageUrl && (
        <div className="event-image">
          <img src={imageUrl} alt={title} />
          <div className="date-badge">{formattedDate}</div>
        </div>
      )}
      <div className="event-content">
        <h2>{emoji} {title}</h2>
        <p><strong>Date:</strong> {formattedDate}</p>
        <p><strong>Location:</strong> {location}</p>
        <p>{description}</p>

        {weather && (
          <div className="event-weather">
            🌤️ <span><strong>Weather:</strong> {weather.temp}°C, {weather.description}</span>
          </div>
        )}
      </div>
    </div>
  );
}

