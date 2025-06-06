import styles from './PublicEventCard.module.css';

export default function PublicEventCard({ title, location, date, image_url, emoji }) {
  const d = new Date(date);
  const formattedDate = `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })}`;

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
        <p className={styles.location}><strong>Location:</strong> {location}</p>
        <button className={styles.button}>Register</button>
      </div>
    </div>
  );
}
