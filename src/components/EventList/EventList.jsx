import { useEffect, useState, useMemo, useCallback, memo } from "react";
import EventCard from "../EventCard/EventCard";
import { useEvents } from "../../context/EventContext";
import styles from "./EventList.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import { FaRegCalendarMinus } from "react-icons/fa";
import SearchBar from "../SearchBar/SearchBar";

const API_KEY = "40850c8658af868d2f8d372ba505c430";

const MemoizedEventCard = memo(EventCard);

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

export default function EventList({ CardComponent = MemoizedEventCard }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermSelect, setSearchTermSelect] = useState("all");
  const { events, loading } = useEvents();
  const [weatherData, setWeatherData] = useState({});

  const filteredEvents = useMemo(() => {
    const searchTermLower = searchTerm.toLowerCase();
    return events.filter((data) => {
      const title = data.title.toLowerCase();
      const location = data.location?.toLowerCase() || "";

      const matchesSearch =
        title.includes(searchTermLower) || location.includes(searchTermLower);

      const matchesType =
        searchTermSelect.toLowerCase() === "all" ||
        data.type === searchTermSelect;

      return matchesSearch && matchesType;
    });
  }, [searchTerm, searchTermSelect, events]);

  const getWeatherForEvent = useCallback(
    (event) => weatherData[`${event.lat},${event.lon}`],
    [weatherData]
  );

  useEffect(() => {
    const loadWeather = async () => {
      const weatherUpdates = {};
      const weatherPromises = [];

      for (const event of filteredEvents) {
        const key = `${event.lat},${event.lon}`;
        if (!weatherData[key]) {
          weatherPromises.push(
            fetchWeather(event.lat, event.lon).then((weather) => {
              if (weather) weatherUpdates[key] = weather;
            })
          );
        }
      }

      await Promise.all(weatherPromises);

      if (Object.keys(weatherUpdates).length > 0) {
        setWeatherData((prev) => ({ ...prev, ...weatherUpdates }));
      }
    };

    if (filteredEvents.length > 0) {
      loadWeather();
    }
  }, [filteredEvents]);

  const handleInput = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleSelect = useCallback((e) => {
    setSearchTermSelect(e.target.value);
  }, []);

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

  return (
    <div>
      <SearchBar
          searchValue={searchTerm}
          onSearchChange={handleInput}
          selectValue={searchTermSelect}
          onSelectChange={handleSelect}
        />
      <div className={styles["events-container"]}>
        {filteredEvents.length === 0 ? (
          <h1>No events found</h1>
        ) : (
          filteredEvents.map((event) => (
            <CardComponent
              key={`${event.id}-${event.lat}-${event.lon}`}
              {...event}
              weather={getWeatherForEvent(event)}
            />
          ))
        )}
      </div>
    </div>
  );
}
