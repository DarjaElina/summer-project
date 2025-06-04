import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./EventCard.module.css";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function EventCard({
  title,
  description,
  location,
  date,
  image_url,
  emoji,
  weather,
}) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "long" });
  const formattedDate = `${day} ${month}`;

  return (
    <div className={style["event-card"]}>
      {image_url && (
        <div className={style["event-image"]}>
          <img src={image_url} alt={title} />
          <div className={style["date-badge"]}>{formattedDate}</div>
        </div>
      )}
      <div className={style["event-content"]}>
        <h2>
          {emoji} {title}
        </h2>
        <p>
          <strong>Date:</strong> {formattedDate}
        </p>
        <p>
          <strong>Location:</strong> {location}
        </p>
        <p>{description}</p>

        {weather && (
          <div className={style["event-weather"]}>
            🌤️{" "}
            <span>
              <strong>Weather:</strong> {weather.temp}°C, {weather.description}
            </span>
          </div>
        )}
        <div className={style["event-button-box"]}>
          <button>
            <FontAwesomeIcon icon={faPenToSquare} />
            Edit
          </button>
          <button>
            <FontAwesomeIcon icon={faTrashCan} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
