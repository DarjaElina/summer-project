import { useState } from "react";
import { update } from "../services/events";
import { useEvents } from "../context/EventContext";

export const useUpdateEvent = () => {
  const { setEvents } = useEvents();
  const [loading, setLoading] = useState(false);

  const updateEvent = async (id, updatedData) => {
    setLoading(true);
    try {
      const data = await update(id, updatedData);
      setEvents(prevEvents =>
        prevEvents.map(event => (event.id === id ? data.event : event))
      );
    } catch (err) {
      throw new Error("Error updating event", err)
    } finally {
      setLoading(false);
    }
  };

  return { updateEvent, loading };
};