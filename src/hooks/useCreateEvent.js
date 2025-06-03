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
      const created = await create(newEvent);
      console.log(created);
      const mockCreated = {
        id: Math.floor(Math.random() * 10000),
        title: newEvent.get('title'),
        description: "I am just a test event not from the backend!!!",
        location: newEvent.get('location'),
        date: newEvent.get('date'),
        lat: 60.1746,
        lng: 24.9384,
        emoji: "🎶",
        imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      };
      setEvents(prev => [...prev, mockCreated]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { createEvent, loading, error };
};
