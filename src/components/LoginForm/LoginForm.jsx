import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { login } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const { authenticate } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const userData = await login(formData);
      authenticate(userData);
      navigate("/events");
    } catch (e) {
      console.error("Login failed:", e);
      setError("Invalid username or password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.inputGroup}>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
          className={formData.username ? "filled" : ""}
          autoComplete="username"
        />
        <label htmlFor="username">Username</label>
      </div>

      <div className={styles.inputGroup}>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          className={formData.password ? "filled" : ""}
          autoComplete="current-password"
        />
        <label htmlFor="password">Password</label>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className="button button-gradient">
        Log In
      </button>
    </form>
  );
}
