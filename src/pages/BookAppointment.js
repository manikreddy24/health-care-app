// src/pages/BookAppointment.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import doctorsData from '../data/doctors';

function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctorsData.find(d => d.id.toString() === id);

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAppointment = {
      name,
      date,
      time,
      doctorName: doctor.name,
    };

    // Pass appointment back to Home via route state
    navigate('/', { state: { newAppointment } });
  };

  if (!doctor) return <p>Doctor not found</p>;

  return (
    <div className="container mt-4">
      <h3>Book Appointment with {doctor.name}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Your Name</label>
          <input name='name' className="form-control" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-2">
          <label>Email</label>
          <input name='email' className="form-control"  onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-1">
          <label>Date</label>
          <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <div className="mb-1">
          <label>Time</label>
          <input type="time" className="form-control" value={time} onChange={e => setTime(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Confirm Booking</button>
      </form>
    </div>
  );
}

export default BookAppointment;
