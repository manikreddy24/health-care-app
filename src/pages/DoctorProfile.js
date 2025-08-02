import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import doctors from '../data/doctors';
import './pages.css';

function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor = doctors.find(d => d.id === parseInt(id));

  if (!doctor) {
    return (
      <div className="container mt-4">
        <h4 className="text-danger">Doctor not found</h4>
        <button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>{doctor.name}</h2>
      <img src={doctor.image} alt={doctor.name} className="img-fluid mb-3 profile-img" />
      <p><strong>Specialization:</strong> {doctor.specialization}</p>
      <p>{doctor.bio}</p>
      <p><strong>Availability:</strong> {doctor.availability.join(', ')}</p>
      <button className="btn btn-primary" onClick={() => navigate(`/book/${id}`)}>
        Book Appointment
      </button>
    </div>
  );
}

export default DoctorProfile;


