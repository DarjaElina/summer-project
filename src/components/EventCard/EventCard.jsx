import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./EventCard.module.css";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function EventCard({
  id,
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

  const [eventObj, setEventObj] = useState({
    title,
    description,
    location,
    date,
    image_url,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleEdit = () => setIsEdit((prev) => !prev);
  const cancelEdit = () => setIsEdit((prev) => !prev);
  const handleDelete = (id) => console.log("Delete Id is", id);

  const onInputEdit = (e) => {
    const { name, value } = e.target;
    setEventObj((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = (id) => {
    console.log("Edit Id is", id);
    console.log("Updated event:", eventObj);
    setIsEdit(false);
  };

  return (
    <div className={style["event-card"]}>
      {image_url && (
        <div className={style["event-image"]}>
          <img src={image_url} alt={title} />
          <div className={style["date-badge"]}>{formattedDate}</div>
        </div>
      )}

      <div className={style["event-content"]}>
        {isEdit ? (
          <>
            <h2>
              {emoji}
              <input
                type="text"
                name="title"
                value={eventObj.title}
                onChange={onInputEdit}
              />
            </h2>
            <p>
              <strong>Date:</strong>{" "}
              <input
                type="text"
                name="date"
                value={eventObj.date}
                onChange={onInputEdit}
              />
            </p>
            <p>
              <strong>Location:</strong>{" "}
              <input
                type="text"
                name="location"
                value={eventObj.location}
                onChange={onInputEdit}
              />
            </p>
            <div style={{ width: "100%" }}>
              <input
                type="text"
                name="description"
                value={eventObj.description}
                style={{ width: "100%" }}
                onChange={onInputEdit}
              />
            </div>
            {showMore && (
              <div className={style["event-button-box"]}>
                <button onClick={() => saveEdit(id)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                  Save
                </button>
                <button onClick={cancelEdit}>
                  <FontAwesomeIcon icon={faTrashCan} />
                  Cancel
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <h2>
              {emoji} {title}
            </h2>
            <p>
              <strong>Date:</strong> {formattedDate}
            </p>
            <p>
              📍<strong>Location:</strong> {location}
            </p>
            <p>{description}</p>
            {showMore && (
              <div className={style["event-button-box"]}>
                <button onClick={handleEdit}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                  Edit
                </button>
                <button onClick={() => handleDelete(id)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                  Delete
                </button>
              </div>
            )}
          </>
        )}

        {weather && (
          <div className={style["event-weather"]}>
            🌤️ <strong>Weather:</strong> {weather.temp}°C, {weather.description}
          </div>
        )}

        <button
          className={showMore ? style.seeLess : style.seeMore}
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore ? "See Less" : "See More"}
        </button>
      </div>
    </div>
  );
}
