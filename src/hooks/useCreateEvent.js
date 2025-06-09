import { useState } from "react";
import { create } from "../services/events";
import { useEvents } from "../context/EventContext";

export const useCreateEvent = () => {
  const { setEvents } = useEvents();
  const [loading, setLoading] = useState(false);

  const createEvent = async (newEvent) => {
    setLoading(true);
    try {
      const data = await create(newEvent);
      setEvents(prev => [...prev, data.event]);
    } catch (err) {
      throw new Error("Error creating event", err)
    } finally {
      setLoading(false);
    }
  };

  return { createEvent, loading };
};
