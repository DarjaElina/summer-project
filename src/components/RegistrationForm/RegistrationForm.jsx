import { useState } from "react";
import toast from "react-hot-toast";

export default function RegistrationForm({ id }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    toast.success("Thank you! We've received your registration 💌");
    setFormData({ name: "", email: "" });
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        name="name"
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        style={{ display: "block", margin: "0.5rem 0" }}
      />
      <input
        name="email"
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        style={{ display: "block", margin: "0.5rem 0" }}
      />
      <button className="button button-primary" type="submit">Attend</button>
    </form>
  );
}

