import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./EventCard.module.css";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDeleteEvent } from "../../hooks/useDeleteEvent";
import { useUpdateEvent } from "../../hooks/useUpdateEvent";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
// import { AddressAutofill } from "@mapbox/search-js-react";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

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

  const { deleteEvent, loading: loadingDelete } = useDeleteEvent();
  const { updateEvent, loading: loadingUpdate } = useUpdateEvent();

  const initialEventObj = { title, description, location, date, image_url };
  const [eventObj, setEventObj] = useState(initialEventObj);
  const [isEdit, setIsEdit] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleEdit = () => setIsEdit((prev) => !prev);

  const cancelEdit = () => {
    setEventObj(initialEventObj);
    setIsEdit(false);
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    toast.promise(deleteEvent(id), {
      loading: "Deleting event...",
      success: "Event successfully deleted!",
      error: "Oops! Something went wrong.",
    });
  };

  const onInputEdit = (e) => {
    const { name, value } = e.target;
    setEventObj((prev) => ({ ...prev, [name]: value }));
  };

  const isValid =
    eventObj.title.trim() !== "" &&
    eventObj.location.trim() !== "" &&
    eventObj.description.trim() !== "";

  const hasChanged = JSON.stringify(eventObj) !== JSON.stringify(initialEventObj);

  const saveEdit = async (id) => {
    try {
      const fullEventData = {
        ...eventObj,
        lat: 60.1699,
        lon: 24.9384,
      };

      await updateEvent(id, fullEventData);
      toast.success("Event successfully updated!");
      setIsEdit(false);
      Object.assign(initialEventObj, fullEventData);
      setShowMore(false);
    } catch (err) {
      toast.error("Oops! Something went wrong.");
      console.error(err);
    }
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
          <div className={style["edit-fields"]}>
            <div className={style["form-group"]}>
              <label className={style["label"]} htmlFor="title">
                <strong>Title:</strong>
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={eventObj.title}
                onChange={onInputEdit}
              />
            </div>

            <div className={style["form-group"]}>
              <label className={style["label"]} htmlFor="date">
                <strong>Date:</strong>
              </label>
              <DatePicker
                selected={new Date(eventObj.date)}
                onChange={(date) =>
                  setEventObj((prev) => ({ ...prev, date }))
                }
                placeholderText="Select date"
                showTimeSelect
                minDate={new Date()}
                dateFormat="Pp"
                className={style.datepicker}
                id="date"
              />
            </div>

            <div className={style["form-group"]}>
              <label className={style["label"]} htmlFor="location">
                <strong>Location:</strong>
              </label>
              {/* Uncomment to enable Mapbox autofill */}
              {/*
              <AddressAutofill accessToken={MAPBOX_TOKEN}>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={eventObj.location}
                  onChange={onInputEdit}
                  autoComplete="address-line1"
                />
              </AddressAutofill>
              */}
              <input
                id="location"
                type="text"
                name="location"
                value={eventObj.location}
                onChange={onInputEdit}
                autoComplete="address-line1"
              />
            </div>

            <div className={style["form-group"]}>
              <label className={style["label"]} htmlFor="description">
                <strong>Description:</strong>
              </label>
              <textarea
                id="description"
                name="description"
                value={eventObj.description}
                onChange={onInputEdit}
              />
            </div>

            {showMore && (
              <div className={style["event-button-box"]}>
                <button
                  onClick={() => saveEdit(id)}
                  disabled={!isValid || !hasChanged || loadingUpdate}
                >
                  {loadingUpdate ? "Saving..." : "Save"}
                </button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <h2 className={style["event-title"]}>
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
                🌤️ <strong>Weather:</strong> {weather.temp}°C,{" "}
                {weather.description}
              </div>
            )}

            {showMore && (
              <div className={style["event-button-box"]}>
                <button onClick={handleEdit}>
                  <FontAwesomeIcon icon={faPenToSquare} /> Edit
                </button>
                <button onClick={() => handleDelete(id)} disabled={loadingDelete}>
                  <FontAwesomeIcon icon={faTrashCan} />{" "}
                  {loadingDelete ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </>
        )}

        <button
          className={showMore ? style.seeLess : style.seeMore}
          onClick={() => {
            if (showMore) {
              setIsEdit(false);
            }
            setShowMore((prev) => !prev);
          }}
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
}
