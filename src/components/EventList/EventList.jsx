import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../EventCard/EventCard";

const eventTypeEmojiMap = {
  General: "🎉",
  Course: "📚",
  Volunteering: "🤝",
};

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://api.hel.fi/linkedevents/v1/event/?format=json&include=location&event_type=General,Course,Volunteering"
      )
      .then((response) => {
        const eventsWithExtras = response.data.data.map((event) => {
          const loc = event.location || {};
          const locationName = loc.name?.fi
            ? `${loc.name.fi} ${loc.street_address?.fi || ""}`.trim()
            : "Unknown location";

          const typeId = event.type_id || "General";
          const emoji = eventTypeEmojiMap[typeId] || "❓";

          return {
            title: event.name?.fi || event.name?.en || "No title",
            description: event.short_description?.fi || event.short_description?.en || "No description available",
            location: locationName,
            date: event.start_time
              ? new Date(event.start_time).toLocaleString()
              : "No date",
            imageUrl: event.images?.[0]?.url || null,
            emoji,
          };
        });

        setEvents(eventsWithExtras);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch events", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }

  return (
    <div>
      <h1>Event List</h1>
      {events.length === 0 ? (
        <p>Not many events right now 😿</p>
      ) : (
        events.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            description={event.description}
            location={event.location}
            date={event.date}
            imageUrl={event.imageUrl}
            emoji={event.emoji}
          />
        ))
      )}
    </div>
  );
}

