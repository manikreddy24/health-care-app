// File: src/components/DoctorCard.jsx
// =============================
import React from 'react';
import { data, useNavigate } from 'react-router-dom';
import './components.css';

function DoctorCard({ doctor }) {
  const navigate = useNavigate();
  return (
    <div className="card doctor-card" onClick={() => navigate(`/doctor/${doctor.id}`)}>
      <img src={doctor.image} className="card-img-top" alt={doctor.name} />
      <div className="card-body">
        <h5 className="card-title">{doctor.name}</h5>
        <p className="card-text">{doctor.specialization}</p>
        <span className={`badge ${getBadgeClass(doctor.status)}`}>{doctor.status}</span>
      </div>
    </div>
  );
}

function getBadgeClass(status) {
  if (status === 'Available Today') return 'bg-success';
  if (status === 'Fully Booked') return 'bg-danger';
  return 'bg-secondary';
}

export default DoctorCard;