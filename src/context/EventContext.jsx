import React, { createContext, useContext, useState, useEffect } from "react";
import { getAll } from "../services/events";
import { useAuth } from "./AuthContext";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setEvents([]);
      setLoading(false);
      return;
    }

    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await getAll();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [isAuthenticated]);

  return (
    <EventContext.Provider value={{ events, setEvents, loading }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
