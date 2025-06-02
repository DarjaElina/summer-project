export default function EventCard({ title, description, location, date, imageUrl, emoji }) {
  return (
    <div className="event-card" style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h2>{emoji} {title}</h2>
      {imageUrl && <img src={imageUrl} alt={title} style={{ width: "200px", height: "auto" }} />}
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Location:</strong> {location}</p>
      <p>{description}</p>
    </div>
  );
}

