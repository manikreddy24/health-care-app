// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import SearchBar from '../components/SearchBar';
import AppointmentForm from '../components/AppointmentForm';
import './pages.css';

function Home() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7000/api/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data));

    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    fetch('http://localhost:7000/api/appointments')
      .then(res => res.json())
      .then(data => setAppointments(data));
  };

  const handleDelete = (id) => {
  fetch(`http://localhost:7000/api/appointments/${id}`, {
    method: 'DELETE'
  })
  .then(res => {
    if (!res.ok) throw new Error('Delete failed');
    return res.json();
  })
  .then(() => fetchAppointments())
  .catch(err => alert('Delete error: ' + err.message));
};



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
          <h5 className="mt-3">Filter Doctors by Specialization</h5>
          <div className="d-flex flex-wrap gap-3">
            {filtered.map(doc => (
              <div key={doc.id} onClick={() => setSelectedDoctor(doc)} style={{ cursor: 'pointer' }}>
                <DoctorCard doctor={doc} />
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-4">
          <h5 className="mb-3">Book Appointment</h5>
          {selectedDoctor ? (
            <AppointmentForm doctor={selectedDoctor} refreshAppointments={fetchAppointments} />
          ) : (
            <p>Please select a doctor to book an appointment.</p>
          )}

          <h5 className="mt-4">Appointments</h5>
          {appointments.length === 0 ? (
            <p>No appointments</p>
          ) : (
            appointments.map(app => (
              <div key={app.id} className="border rounded p-2 mb-2 d-flex justify-content-between align-items-center">
                <div>
                  <strong>{app.name}</strong><br />
                  {app.date} at {app.time}
                </div>
                <button onClick={() => handleDelete(app.id)} className="text-red-500">Delete</button>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

