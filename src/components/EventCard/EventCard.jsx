import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./EventCard.module.css";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDeleteEvent } from "../../hooks/useDeleteEvent";
import { useUpdateEvent } from "../../hooks/useUpdateEvent";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import { SearchBox } from "@mapbox/search-js-react";
import { formatInTimeZone } from 'date-fns-tz'
import { parseUTCDateFromDB } from '../../utils/dateHelper';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;


export default function EventCard({
  id,
  title,
  description,
  location,
  date,
  image_url, 
  emoji,
  is_public,
  weather,
  lat,
  lon
}) {
  const d = parseUTCDateFromDB(date);
  const badgeDate = formatInTimeZone(d, 'Europe/Helsinki', 'd MMMM');
  
  const dateWithTime = formatInTimeZone(d, 'Europe/Helsinki' , 'd MMMM \'at\' HH:mm');

  const { deleteEvent, loading: loadingDelete } = useDeleteEvent();
  const { updateEvent, loading: loadingUpdate } = useUpdateEvent();

  const initialEventObj = { title, description, location, date: new Date(parseUTCDateFromDB(date)), image_url, is_public, lat, lon };
  const [eventObj, setEventObj] = useState(initialEventObj);
  const [isEdit, setIsEdit] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const optimizedImageUrl = image_url.replace('/upload/', '/upload/w_600,f_auto,q_auto:eco/');

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

    setShowMore(false);
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
      const now = new Date();
      const selectedDate = new Date(eventObj.date);

      if (selectedDate < now) {
        toast.error("Date cannot be in the past.");
        return;
      }
      const fullEventData = {
        ...eventObj,
        date: eventObj.date.toISOString().slice(0, 19).replace('T', ' ')
      }


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
          <img
            src={optimizedImageUrl}
            srcSet={`
              ${image_url.replace('/upload/', '/upload/w_400,f_auto,q_auto/')} 400w,
              ${image_url.replace('/upload/', '/upload/w_800,f_auto,q_auto/')} 800w
            `}
            sizes="(max-width: 600px) 400px, 800px"
            alt={title}
            width="800"
            height="533"
          />
          <div className={style["date-badge"]}>{badgeDate}</div>
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
              <SearchBox
                id="location"
                name="location"
                options={{ country: "FI", types: "address, street, place" }}
                value={eventObj.location}
                accessToken={MAPBOX_TOKEN}
                onChange={(input) => {
                  setEventObj((prev) => ({
                    ...prev,
                    location: input,
                    lat: null,
                    lon: null,
                  }));
                }}
                onRetrieve={(data) => {
                  const feature = data.features?.[0];
                  if (!feature) return;

                  setEventObj((prev) => ({
                    ...prev,
                    location: feature.properties.full_address,
                    lat: feature.properties.coordinates.latitude,
                    lon: feature.properties.coordinates.longitude,
                  }));
                }}
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

            <div className="checkboxRow">
              <label className={`${style["label"]} staticLabel`} htmlFor="is_public">
                <strong>Public:</strong>
              </label>
              <input
                id="is_public"
                type="checkbox"
                checked={eventObj.is_public}
                onChange={() =>
                  setEventObj((prev) => ({ ...prev, is_public: !prev.is_public }))
                }
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
              📅 <strong>Date:</strong> {dateWithTime}
            </p>
            <p>
              📍<strong>Location:</strong> {location}
            </p>

            {weather && (
              <div className={style["event-weather"]}>
                🌤️ <strong>Weather:</strong> {weather.temp}°C,{" "}
                {weather.description}
              </div>
            )}

            {showMore && (
                <><p>{description}</p><div className={style["event-button-box"]}>
                  <button onClick={handleEdit}>
                    <FontAwesomeIcon icon={faPenToSquare} /> Edit
                  </button>
                  <button onClick={() => handleDelete(id)} disabled={loadingDelete}>
                    <FontAwesomeIcon icon={faTrashCan} />{" "}
                    {loadingDelete ? "Deleting..." : "Delete"}
                  </button>
                </div></>
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
