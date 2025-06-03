import { useState, useEffect } from "react";
import "../ThemeToggle/ThemeToggle.css";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage or default to light
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement; // <html> element
    const theme = isDark ? "dark" : "light";
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

  return (
    <button className="theme-toggle" onClick={() => setIsDark(prev => !prev)}>
      <span>{isDark ? "☀️" : "🌙"}</span>
      <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );
}
