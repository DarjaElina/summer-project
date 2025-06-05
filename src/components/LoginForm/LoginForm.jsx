import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import useLogin from "../../hooks/useLogin";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, loading } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      toast.success("Log in successful.");
      navigate("/events");
    } catch (errors) {
      errors.forEach((err) => toast.error(err));
    } finally {
      setFormData({ email: "", password: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <h3>Log In</h3>
      <div className={styles.inputGroup}>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={formData.email ? "filled" : ""}
          autoComplete="email"
        />
        <label htmlFor="email">Email</label>
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
      <button
        type="submit"
        className="button button-gradient"
        disabled={loading}
      >
        {loading ? "Logging In..." : "Log In"}
      </button>
    </form>
  );
}
