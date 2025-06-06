import React, { useState } from "react";
import style from "./Header.module.css";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Header() {
  const [showProfile, setShowProfile] = useState(false);
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
        HELSINKI <span>Event Planner</span>
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
                <NavLink to="/contact" className={style.a}>
                  Contact Us
                </NavLink>
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
              <li className={style.user_profile_div}>
                <div
                  className={style.user_profile_icon}
                  onClick={() => setShowProfile((prev) => !prev)}
                >
                  AB
                </div>
                <ul
                  className={
                    showProfile
                      ? style.user_profile_dropdown_block
                      : style.user_profile_dropdown_none
                  }
                >
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
                </ul>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
