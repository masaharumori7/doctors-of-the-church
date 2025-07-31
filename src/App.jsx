import React, { useEffect, useState } from "react";
import DoctorCard from "./components/DoctorCard";
import "./theme.css";

const GITHUB_URL = "https://github.com/masaharumori7/doctors-of-the-church";

function parseFirstYear(years) {
  // Extract the first number in the years string (handles c., ranges, etc)
  const match = years.match(/(\d{3,4})/);
  return match ? parseInt(match[1], 10) : 9999;
}

function App() {
  const [doctors, setDoctors] = useState([]);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [sortBy, setSortBy] = useState("alpha");

  useEffect(() => {
    fetch("/doctors.json")
      .then((res) => res.json())
      .then(setDoctors);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const sortedDoctors = React.useMemo(() => {
    if (sortBy === "year") {
      return [...doctors].sort((a, b) => parseFirstYear(a.years) - parseFirstYear(b.years));
    } else {
      return [...doctors].sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [doctors, sortBy]);

  return (
    <div className="roman-bg min-h-screen flex flex-col">
      <header className="roman-header">
        <div className="roman-header-content">
          <h1 className="roman-title">Doctors of the Church Gallery</h1>
          <span className="roman-intro">Doctors of the Church are saints recognized by the Catholic Church for their significant contributions to theology and doctrine through their writings and teachings. As of 2025, there are 38 Doctors of the Church. Explore their lives, works, and enduring wisdom through the ages.</span>
        </div>
        <div className="roman-header-actions">
          <div style={{ display: 'flex', gap: '0.5em', alignItems: 'center' }}>
            <button
              className={`roman-btn${sortBy === "alpha" ? " active" : ""}`}
              style={{ minWidth: 120 }}
              onClick={() => setSortBy("alpha")}
              aria-pressed={sortBy === "alpha"}
            >
              A–Z
            </button>
            <button
              className={`roman-btn${sortBy === "year" ? " active" : ""}`}
              style={{ minWidth: 120 }}
              onClick={() => setSortBy("year")}
              aria-pressed={sortBy === "year"}
            >
              By Year
            </button>
          </div>
          <button
            className="theme-toggle roman-btn"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn roman-btn"
            aria-label="GitHub"
          >
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
            </svg>
          </a>
        </div>
      </header>
      <main className="flex-1 roman-main">
        <div className="gallery-grid">
          {sortedDoctors.map((doctor, i) => (
            <DoctorCard key={doctor.name + i} doctor={doctor} />
          ))}
        </div>
      </main>
      <footer className="roman-footer p-4 text-center border-t-4 border-b-0 border-solid border-[var(--border)]">
        <span className="text-sm">Doctors of the Church Gallery</span>
      </footer>
    </div>
  );
}

export default App;
