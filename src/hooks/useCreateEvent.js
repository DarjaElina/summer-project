import { useState } from "react";
import { create } from "../services/events";
import { useEvents } from "../context/EventContext";

export const useCreateEvent = () => {
  const { setEvents } = useEvents();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createEvent = async (newEvent) => {
    setLoading(true);
    setError(null);
    try {
      console.log(newEvent.get('is_public'));
      const data = await create(newEvent);
      setEvents(prev => [...prev, data.event]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { createEvent, loading, error };
};
