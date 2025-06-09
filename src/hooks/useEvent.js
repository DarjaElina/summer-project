import { useEffect, useState } from "react";
import { getPublicOne, getOne } from "../services/events";

export const useEvent = (id, isPublic = true) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = isPublic
          ? await getPublicOne(id)
          : await getOne(id);
        setEvent(data);
      } catch (err) {
        throw new Error("Error fethcing event", err)
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isPublic]);

  return { event, loading };
};
