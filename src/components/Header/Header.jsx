import React from "react";
import style from "./Header.module.css";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      navigate("login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <header className={style.header}>
      <h2>
        Event<span>Planner</span>
      </h2>
      <nav>
        <ul>
          {!isAuthenticated && (
            <>
              <li>
                <NavLink to="/" className={style.a}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" className={style.a}>
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className={style.a}>
                  Log In
                </NavLink>
              </li>
              <li>
                <a className={style.a} href="#about">
                  About
                </a>
              </li>
              <li>
                <a className={style.a} href="#contact">
                  Contact
                </a>
              </li>
            </>
          )}

          {isAuthenticated && (
            <>
              <li>
                <NavLink to="/events" className={style.a} end>
                  My Events
                </NavLink>
              </li>
              <li>
                <NavLink to="/events/create" className={style.a}>
                  Create Event
                </NavLink>
              </li>
              <li>
                <NavLink to="/Map" className={style.a}>
                  Map
                </NavLink>
              </li>
              <li>
                <NavLink to="/Calendar" className={style.a}>
                  Calendar
                </NavLink>
              </li>
              <li>
                <button className="button button-gradient" onClick={handleLogout}>
                  Log Out
                </button>
              </li>
            </>
          )}

          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
