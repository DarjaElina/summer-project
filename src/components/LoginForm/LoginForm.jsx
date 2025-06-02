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
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="username" className={styles.label}>Username</label>
      <input name="username" onChange={handleChange} className={styles.input} required />

      <label htmlFor="password" className={styles.label}>Password</label>
      <input name="password" type="password" onChange={handleChange} className={styles.input} required />

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.button}>Log In</button>
    </form>
  );
}


