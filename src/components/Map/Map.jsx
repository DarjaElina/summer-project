import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEvents } from "../../context/EventContext";
import "leaflet/dist/leaflet.css";

const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#6c63ff';

const createColoredIcon = (color) => {
  return new L.DivIcon({
    html: `
      <svg width="24" height="38" viewBox="0 0 24 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.37258 0 0 5.37258 0 12C0 22.5 12 38 12 38C12 38 24 22.5 24 12C24 5.37258 18.6274 0 12 0Z" fill="${color}"/>
        <circle cx="12" cy="12" r="6" fill="white"/>
      </svg>`,
    className: "",
    iconSize: [24, 38],
    iconAnchor: [12, 38],
    popupAnchor: [0, -38],
  });
};

export default function Map() {
  const { events } = useEvents();

  // Create the icon once with your theme color
  const coloredIcon = createColoredIcon(primaryColor);

  return (
    <MapContainer
      center={[60.1699, 24.9384]}
      zoom={11}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {events.map((event) => (
        <Marker key={event.id} position={[event.lat, event.lon]} icon={coloredIcon}>
          <Popup>
            <strong>{event.title}</strong>
            <br />
            📍 {event.location}
            <br />
            📅 {event.date}
            <br />
            📝 {event.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
