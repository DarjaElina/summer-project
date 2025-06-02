import EventCard from "../EventCard/EventCard";
import { useEvents } from "../../context/EventContext";

export default function EventList() 
  return <div>EventList</div>;
}

  const {events, loading} = useEvents()

  if (loading) {
    return <p>Loading events...</p>;
  }

  return (
    <div>
      <h1>Event List</h1>
      {events.length === 0 ? (
        <p>No events found right now</p>
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

