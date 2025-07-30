import React from "react";

function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card roman-card">
      <div className="roman-card-header">
        <div className="doctor-name">{doctor.name}</div>
        <div className="doctor-years">{doctor.years}</div>
        <div className="roman-card-header-separator" />
      </div>
      <div className="roman-card-body">
        <p className="doctor-description mb-2">{doctor.description}</p>
        <div className="doctor-works">
          <span className="font-semibold">Notable Works:</span>
          <ul className="list-disc list-inside ml-2 mt-1">
            {doctor.notable_works.map((work, i) => (
              <li key={i} className="work-item hover:underline cursor-pointer">{work}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard; 