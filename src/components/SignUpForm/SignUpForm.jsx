import React, { useState } from "react";
import styles from "./SignUpForm.module.css";
import toast from "react-hot-toast";
import useSignup from "../../hooks/useSignup";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { signup, loading } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("All fields are required.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      await signup(formData);
      toast.success("Sign up successful, you can now log in.");
    } catch (errors) {
      errors.forEach(err => toast.error(err));
    } finally {
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      })
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <h3>Sign Up</h3>
      <div className={styles.inputGroup}>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className={formData.name ? "filled" : ""}
        />
        <label htmlFor="name">Name</label>
      </div>

      <div className={styles.inputGroup}>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={formData.email ? "filled" : ""}
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
        />
        <label htmlFor="confirmPassword">Password</label>
      </div>

      <div className={styles.inputGroup}>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className={formData.confirmPassword ? "filled" : ""}
        />
        <label htmlFor="confirmPassword">Confirm password</label>
      </div>

      <button type="submit" className="button button-gradient" disabled={loading}>
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
}