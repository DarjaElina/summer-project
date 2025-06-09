import React, { useState } from "react";
import style from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    try {
      logout();
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <header className={style.header}>
      <h2>
        HELSINKI <span>Event Planner</span>
      </h2>

      <button
        className={style.hamburger}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <nav className={`${style.nav} ${sidebarOpen ? style.open : ""}`}>
        <button className={style.closeButton} onClick={closeSidebar}>
          ×
        </button>
        <ul>
          {!isAuthenticated ? (
            <>
              <li>
                <NavLink to="/" className={style.a} onClick={closeSidebar}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" className={style.a} onClick={closeSidebar}>
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className={style.a} onClick={closeSidebar}>
                  Log In
                </NavLink>
              </li>
              <li>
                <a href="#about" className={style.a} onClick={closeSidebar}>
                  About
                </a>
              </li>
              <li>
                <NavLink to="/contact" className={style.a} onClick={closeSidebar}>
                  Contact Us
                </NavLink>
              </li>
              <li>
                <ThemeToggle />
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/events" className={style.a} end onClick={closeSidebar}>
                  My Events
                </NavLink>
              </li>
              <li>
                <NavLink to="/events/create" className={style.a} onClick={closeSidebar}>
                  Create Event
                </NavLink>
              </li>
              <li>
                <NavLink to="/Map" className={style.a} onClick={closeSidebar}>
                  Map
                </NavLink>
              </li>
              <li>
                <NavLink to="/Calendar" className={style.a} onClick={closeSidebar}>
                  Calendar
                </NavLink>
              </li>
              <li>
                <button
                  className="button button-gradient"
                  onClick={() => {
                    handleLogout();
                    closeSidebar();
                  }}
                >
                  Log Out
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
