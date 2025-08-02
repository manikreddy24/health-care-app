// File: src/pages/BookAppointment.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './pages.css';

function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', date: '', time: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:7000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, doctorId: id })
    }).then(() => setSubmitted(true));
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => navigate('/'), 2000); // redirect after 2s
      return () => clearTimeout(timer);
    }
  }, [submitted, navigate]);

  if (submitted) {
    return (
      <div className="container mt-4 alert alert-success text-center">
        Appointment booked successfully! Redirecting to home...
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Book Appointment with Doctor #{id}</h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        <input className="form-control" name="name" placeholder="Name" required onChange={handleChange} />
        <input className="form-control" type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input className="form-control" type="date" name="date" required onChange={handleChange} />
        <input className="form-control" type="time" name="time" required onChange={handleChange} />
        <button className="btn btn-success mt-3" type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}

export default BookAppointment;
