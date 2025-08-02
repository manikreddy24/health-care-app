// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import doctorsData from '../data/doctors';
import DoctorCard from '../components/DoctorCard';
import SearchBar from '../components/SearchBar';
import './pages.css';

function Home() {
  const [doctors] = useState(doctorsData);
  const [search, setSearch] = useState('');
  const [appointments, setAppointments] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.newAppointment) {
      setAppointments(prev => [...prev, location.state.newAppointment]);
    }
  }, [location.state]);

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Book Your Doctor Appointment</h2>
      <div className="row">
        <div className="col-md-8">
          <SearchBar value={search} onChange={setSearch} />
          <div className="d-flex flex-wrap gap-3">
            {filtered.map(doc => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        </div>

        <div className="col-md-4">
          <h5>Appointments</h5>
          {appointments.length === 0 ? (
            <p>No appointments yet.</p>
          ) : (
            appointments.map((app, idx) => (
              <div key={idx} className="border p-2 mb-2 rounded">
                <strong>{app.name}</strong> with <em>{app.doctorName}</em><br />
                {app.date} at {app.time}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
