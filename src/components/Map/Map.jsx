import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEvents } from "../../context/EventContext";
import 'leaflet/dist/leaflet.css';

export default function Map() {
  const { events } = useEvents()
  return (
    <MapContainer center={[60.1699, 24.9384]} zoom={11} scrollWheelZoom={false} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {events.map(event => (
        <Marker key={event.id} position={[event.lat, event.lng]}>
          <Popup>
            <strong>{event.title}</strong><br />
            📍 {event.location}<br />
            📅 {event.date}<br />
            📝 {event.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
