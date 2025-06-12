import React, { useState, useRef, useEffect } from "react";
import style from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleLogout = () => {
    try {
      logout();
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        sidebarOpen
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <header className={style.header}>
      <a href="/" className={style.logo}>
        Meetora
      </a>

      <button
        className={style.hamburger}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <nav
        ref={sidebarRef}
        className={`${style.nav} ${sidebarOpen ? style.open : ""}`}
      >
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
                <NavLink
                  to="/signup"
                  className={style.a}
                  onClick={closeSidebar}
                >
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className={style.a} onClick={closeSidebar}>
                  Log In
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/events/public"
                  className={style.a}
                  onClick={closeSidebar}
                >
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={style.a}
                  onClick={closeSidebar}
                >
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
                <NavLink
                  to="/events"
                  className={style.a}
                  end
                  onClick={closeSidebar}
                >
                  My Events
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/events/create"
                  className={style.a}
                  onClick={closeSidebar}
                >
                  Create Event
                </NavLink>
              </li>
              <li>
                <NavLink to="/Map" className={style.a} onClick={closeSidebar}>
                  Map
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Calendar"
                  className={style.a}
                  onClick={closeSidebar}
                >
                  Calendar
                </NavLink>
              </li>
              <li>
                <ThemeToggle />
              </li>
              <li>
                <button
                  className="button button-gradient"
                  onClick={handleLogout}
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
