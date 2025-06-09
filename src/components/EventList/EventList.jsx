import { useEffect, useState } from "react";
import EventCard from "../EventCard/EventCard";
import { useEvents } from "../../context/EventContext";
import styles from "./EventList.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import { FaRegCalendarMinus } from "react-icons/fa";
const API_KEY = "40850c8658af868d2f8d372ba505c430";

async function fetchWeather(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) return null;

    const data = await response.json();
    return {
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}

export default function EventList({ CardComponent = EventCard }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermSelect, setSearchTermSelect] = useState("");
  const [filteredEvents, setFilterdEvents] = useState([]);

  const { events, loading } = useEvents();
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const loadWeather = async () => {
      const newWeatherData = {};

      for (const event of events) {
        const key = `${event.lat},${event.lon}`;
        if (!weatherData[key]) {
          const weather = await fetchWeather(event.lat, event.lon);
          if (weather) {
            newWeatherData[key] = weather;
          }
        }
      }
      setWeatherData((prev) => ({ ...prev, ...newWeatherData }));
    };

    if (events.length > 0) {
      loadWeather();
    }
  }, [events]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <ClipLoader size={60} color="#9a9fff" />
        <p>Loading events, please wait...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className={styles.noEventsContainer}>
        <FaRegCalendarMinus size={60} />
        <p>No events found right now.</p>
        <p>Try checking back later or add some events!</p>
      </div>
    );
  }

  const handleInput = (e) => {
    let searchText = e.target.value;
    setSearchTerm(searchText);
    // console.log(searchTerm);
  };
  const handleSelect = (e) => {
    let searchSelect = e.target.value;
    setSearchTermSelect(searchSelect);
    // console.log(searchTermSelect);
  };

  useEffect(() => {
    let filteredEventsInput = events.filter((data) => {
      return (
        data.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (searchTermSelect.toLowerCase() == "all"
          ? data
          : searchTermSelect === "" || data.type === searchTermSelect)
      );
    });
    setFilterdEvents(filteredEventsInput);
  }, [searchTerm, searchTermSelect, events]);
  return (
    <div>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search by title,location"
          onChange={handleInput}
        />
        <select name="" id="" onChange={handleSelect}>
          <option value="all">All</option>
          <option value="general">General</option>
          <option value="course">Course</option>
          <option value="volunteering">Volunteering</option>
          <option value="sports">Sports</option>
          <option value="music">Music</option>
          <option value="art and culture">Art and Culture</option>
          <option value="food and drink">Food and Drink</option>
          <option value="networking">Networking</option>
          <option value="online">Online</option>
          <option value="kids and family">Kids and Family</option>
        </select>
      </div>
      <div className={styles["events-container"]}>
        {filteredEvents.length == 0 ? (
          <h1>No data found</h1>
        ) : (
          filteredEvents.map((event, index) => (
            <CardComponent
              key={index}
              {...event}
              weather={weatherData[`${event.lat},${event.lon}`]}
            />
          ))
        )}
      </div>
    </div>
  );
}
