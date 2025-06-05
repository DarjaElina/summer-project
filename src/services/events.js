import api from "./axios";

export const getAll = async () => {
  const response = await api.get("/events");
  console.log(response.data.events);
  return response.data.events;
};

export const create = async (newEvent) => {
  const response = await api.post("/events", newEvent, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const update = async (id, updatedEvent) => {
  const response = await api.patch(`/events/${id}`, updatedEvent, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const deleteData = async (id) => {
  const response = await api.delete(`/events/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
