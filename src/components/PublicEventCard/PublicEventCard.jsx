import React from "react";
export default function PublicEventCard({ id, title, date }) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "long" });
  const formattedDate = `${day} ${month}`;

  const handleRegister = () => {
    alert(`Registered for event: ${title}`);
  };

  return (
    <div>
      <div>
        <h2>{title}</h2>
        <p>
          <strong>Date:</strong> {formattedDate}
        </p>
        <button onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}
