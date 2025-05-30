import React from "react";
import style from "./Header.module.css";
import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className={style.header}>
      <h2>
        Event<span>Planner</span>
      </h2>
      <nav>
        <ul>
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
        </ul>
      </nav>
    </header>
  );
}
