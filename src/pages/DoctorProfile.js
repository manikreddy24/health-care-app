// File: src/pages/DoctorProfile.jsx
// =============================
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './pages.css';

function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:7000/api/doctors/${id}`)
      .then(res => res.json())
      .then(data => setDoctor(data));
  }, [id]);

  if (!doctor) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{doctor.name}</h2>
      <img src={doctor.image} alt={doctor.name} className="img-fluid mb-3 profile-img" />
      <p><strong>Specialization:</strong> {doctor.specialization}</p>
      <p>{doctor.bio}</p>
      <p><strong>Availability:</strong> {doctor.availability.join(', ') || 'Not available this week'}</p>
      <button className="btn btn-primary" onClick={() => navigate(`/book/${doctor.id}`)}>
        Book Appointment
      </button>
    </div>
  );
}

export default DoctorProfile;