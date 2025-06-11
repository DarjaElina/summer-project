import EventList from "../components/EventList/EventList"
import PublicEventCard from "../components/PublicEventCard/PublicEventCard"

const Events = () => {
  return (
    <div className="eventsContainer">
      <EventList CardComponent={PublicEventCard}/>
    </div>
  )
}

export default Events