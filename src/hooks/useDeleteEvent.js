import { useState } from "react";
import { remove } from "../services/events";
import { useEvents } from "../context/EventContext";

export const useDeleteEvent = () => {
  const { setEvents } = useEvents();
  const [loading, setLoading] = useState(false);

  const deleteEvent = async (id) => {
    setLoading(true);
    try {
      await remove(id);
      setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
    } catch (err) {
      throw new Error("Error removing event", err)
    } finally {
      setLoading(false);
    }
  };

  return { deleteEvent, loading };
};
