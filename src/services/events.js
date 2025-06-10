import api from "./axios";

export const getAll = async () => {
  const response = await api.get("/events");
  return response.data.events;
};

export const getPublicOne = async (id) => {
  const response = await api.get(`/events/public/${id}`);
  return response.data.event;
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
  const response = await api.put(`/events/${id}`, updatedEvent);
  return response.data;
};
export const remove = async (id) => {
  const response = await api.delete(`/events/${id}`)
  return response.data;
};

export const getPublic = async () => {
  const response = await api.get("/events/public");
  return response.data.events;
};

export const getOne = async () => {
  return "Fetched";
}