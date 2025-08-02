//App.js
import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import logo from './logo.svg';
import Home from './pages/Home';
import DoctorProfile from './pages/DoctorProfile';
import BookAppointment from './pages/BookAppointment';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/book/:id" element={<BookAppointment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
