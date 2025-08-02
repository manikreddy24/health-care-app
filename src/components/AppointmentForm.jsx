// src/components/AppointmentForm.js
import React, { useState } from 'react';

function AppointmentForm({ doctor, addAppointment }) {
  const [form, setForm] = useState({ name: '', date: '', time: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: Date.now(),
      doctorName: doctor.name,
      ...form
    };
    addAppointment(newAppointment); // update lifted state in Home.js
    setForm({ name: '', date: '', time: '' });
    alert("Appointment Confirmed!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" className="form-control mb-2" placeholder="Your Name" value={form.name} onChange={handleChange} required />
      <input type="date" name="date" className="form-control mb-2" value={form.date} onChange={handleChange} required />
      <input type="time" name="time" className="form-control mb-2" value={form.time} onChange={handleChange} required />
      <button className="btn btn-primary w-100" type="submit">Confirm Appointment</button>
    </form>
  );
}

export default AppointmentForm;
