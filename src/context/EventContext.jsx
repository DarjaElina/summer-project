import React, { createContext, useContext, useState, useEffect } from "react";
import { getAll, getPublic } from "../services/events";
import { useAuth } from "./AuthContext";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        let data = [];
        if (isAuthenticated) {
          data = await getAll();
        } else {
          data = await getPublic();
        }
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
