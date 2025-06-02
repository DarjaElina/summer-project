import { useEffect, useState } from "react";
import EventCard from "../EventCard/EventCard";
import { useEvents } from "../../context/EventContext";
import styles from "./EventList.module.css";

const API_KEY = "40850c8658af868d2f8d372ba505c430";



// Fetch current weather by city name
async function fetchWeather(lat,lon) {
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


export default function EventList() {
  const { events, loading } = useEvents();
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const loadWeather = async () => {
      const newWeatherData = {};

      for (const event of events) {
        const key = `${event.lat},${event.lng}`;
        if (!weatherData[key]) {
          const weather = await fetchWeather(event.lat, event.lng);
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
    return <p>Loading events...</p>;
  }

  return (
    <div>
      <h1>Event List</h1>
      {events.length === 0 ? (
        <p>No events found right now</p>
      ) : (
        <div className={styles["events-container"]}>
          {events.map((event, index) => (
            <EventCard
              key={index}
              {...event}
              weather={weatherData[`${event.lat},${event.lng}`]}
            />
          ))}
        </div>
      )}
    </div>
  );
}


