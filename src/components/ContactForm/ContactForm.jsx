
import React, { useState } from "react";
import axios from "axios";
import "../ContactForm/ContactForm.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await axios.post(`${API_URL}/contact`, form);
      setStatus("Message sent!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      if (error.response?.data?.errors) {
        setStatus("Error: " + Object.values(error.response.data.errors).flat().join(", "));
      } else {
        setStatus("An error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Us</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Your email" required />
      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your message" required />
      <button type="submit">Send</button>
      <p>{status}</p>
    </form>
  );
}
