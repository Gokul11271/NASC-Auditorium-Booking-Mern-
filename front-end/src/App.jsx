import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes
import BookingForm from "./components/BookingForm.jsx";
import Login from "./components/Login";
import CancelingForm from "./components/CancelForm.jsx";

import Contact from "./components/Contact.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import MainPage from "./components/MainPage.jsx";
import Homepage from "./components/Homepage.jsx";// Ensure correct import path

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />{" "}
        {/* Main page with Homepage and Contact */}
        <Route path="/bookingform" element={<BookingForm />} />{" "}
        {/* Booking form route */}
        <Route path="/cancelingform" element={<CancelingForm />} />{" "}
        {/* Canceling form route */}
        <Route path="/login" element={<Login />} />
        {/* Login route */}
        <Route path="/contact" element={<Contact />} />
        {/* Contact route */}
        <Route path="/admin." element={<AdminDashboard />} />{" "}
        {/* Admin dashboard route */}
      </Routes>
    </Router>
  );
};

export default App;
