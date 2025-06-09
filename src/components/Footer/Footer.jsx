import React from "react";
import style from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.columns}>
        <div className={style.column}>
          <h4>About Us</h4>

          <p>We are a leading provider of event planning and management solutions. Using state-of-the-art software applications, we enable you to track your favorite events with ease to use and create and share your own event invitations effortlessly.</p>
        </div>
        <div className={style.column}>
          <h4>Links</h4>
          <ul>
            <li><a href="#">Events</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className={style.column}>
          <h4>Follow Us</h4>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <p>Copyright © 2025 | Business College Helsinki | REACT25K</p>
    </footer>
  );
}


