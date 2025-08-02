// src/components/AppointmentForm.jsx
import React, { useState } from 'react';

function AppointmentForm({ doctor, refreshAppointments }) {
  const [formData, setFormData] = useState({ name: '', date: '', time: '' });

  const availableDates = doctor.availability;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:7000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, doctorId: doctor.id, doctorName: doctor.name })
    });

    if (res.ok) {
      setFormData({ name: '', date: '', time: '' });
      refreshAppointments();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" className="form-control mb-2" placeholder="Your Name"
        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />

      <select className="form-control mb-2"
        value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required>
        <option value="">Select Date</option>
        {availableDates.map(date => (
          <option key={date} value={date}>{date}</option>
        ))}
      </select>


      <input type="time" className="form-control mb-2"
        value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} required />

      <button className="btn btn-primary btn-sm w-100">Book</button>
    </form>
  );
}

export default AppointmentForm;


