import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./img/Pi7_NASC LOGO.png"; // Ensure this is the correct path
import first from "./img/first.mp4"; // Ensure this is the correct path

const Homepage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/bookingform");
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-t from-black via-transparent to-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      >
        <source src={first} type="video/mp4" />
      </video>

      {/* Header */}
      <header className="flex items-center justify-between h-20 px-8 absolute top-0 left-0 w-full z-10 bg-transparent">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-32 mr-4" />
          <h2 className="text-white font-semibold text-lg md:text-xl">
            NANDHA ARTS AND SCIENCE COLLEGE (AUTONOMOUS)
          </h2>
        </div>
        <nav className="flex items-center">
          <Link
            to="/"
            className="mx-4 text-white hover:text-teal-400 transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="mx-4 text-white hover:text-teal-400 transition"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="mx-4 text-white hover:text-teal-400 transition"
          >
            Contact
          </Link>
          <Link
            to="/bookingform"
            className="mx-4 text-white hover:text-teal-400 transition"
          >
            BookingForm
          </Link>
          <Link
            to="/cancelingform"
            className="mx-4 text-white hover:text-teal-400 transition"
          >
            CancelingForm
          </Link>
          <Link
            to="/login"
            className="mx-4 text-white hover:text-teal-400 transition"
          >
            Login
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <div className="content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold">
          Auditorium Booking
        </h1>
        <button
          onClick={handleButtonClick}
          className="mt-8 px-10 py-4 text-xl font-bold bg-teal-500 text-white rounded-full hover:bg-teal-600 transition duration-500 shadow-lg"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Homepage;
