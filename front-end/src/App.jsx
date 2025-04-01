import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookingForm from "./components/BookingForm.jsx";
import Login from "./components/Login";
import CancelingForm from "./components/CancelForm.jsx";
import Contact from "./components/Contact.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import MainPage from "./components/MainPage.jsx";
import AboutUs from "./components/About.jsx";
import AIncharge from "./components/A-incharge.jsx";
import ProtectedRoute from "./components/ProtectedRoute"; // Import Protected Route
import Unauthorized from "./components/Unauthorized"; // Create this component for unauthorized access

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/mainpage"
          element={
            <ProtectedRoute
              element={<MainPage />}
              allowedRoles={["user", "manager", "admin"]}
            />
          }
        />
        <Route
          path="/bookingform"
          element={
            <ProtectedRoute
              element={<BookingForm />}
              allowedRoles={["user", "manager", "admin"]}
            />
          }
        />
        <Route
          path="/cancelingform"
          element={
            <ProtectedRoute
              element={<CancelingForm />}
              allowedRoles={["user", "manager", "admin"]}
            />
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute
              element={<Contact />}
              allowedRoles={["user", "manager", "admin"]}
            />
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute
              element={<AboutUs />}
              allowedRoles={["user", "manager", "admin"]}
            />
          }
        />

        {/* Admin and Manager Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              element={<AdminDashboard />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/A-incharge"
          element={
            <ProtectedRoute
              element={<AIncharge />}
              allowedRoles={["manager"]}
            />
          }
        />

        {/* Unauthorized Access Page */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 404 Page */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
