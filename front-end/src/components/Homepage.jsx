import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./img/Pi7_NASC LOGO.png"; // Ensure this is the correct path
import first from "./img/first.mp4"; // Ensure this is the correct path

const Homepage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleButtonClick = () => {
    navigate("/bookingform"); // Programmatically navigate to the bookingform route
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

      {/* Navbar */}
      <div className="navbar container mx-auto p-6 flex justify-between items-center">
        <img
          className="logo w-32 cursor-pointer"
          src={Logo} // Use the imported Logo variable
          alt="Logo"
        />
        <h2 className="text-white font-semibold text-xl text-center">
          NANDHA ARTS AND SCIENCE COLLEGE (AUTONOMOUS)
        </h2>
        <ul className="flex gap-6">
          <li>
            <Link
              to="/"
              className="text-white font-semibold uppercase px-4 py-2 transition duration-300 hover:bg-white hover:text-black rounded-full"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/bookingform"
              className="text-white font-semibold uppercase px-4 py-2 transition duration-300 hover:bg-white hover:text-black rounded-full"
            >
              BookingForm
            </Link>
          </li>
          <li>
            <Link
              to="/cancelingform"
              className="text-white font-semibold uppercase px-4 py-2 transition duration-300 hover:bg-white hover:text-black rounded-full"
            >
              CancelingForm
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-white font-semibold uppercase px-4 py-2 transition duration-300 hover:bg-white hover:text-black rounded-full"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h1 className="text-6xl font-extrabold">Auditorium Booking</h1>
        
        <button
          className="mt-8 px-10 py-4 text-xl font-bold bg-teal-500 text-white rounded-full hover:bg-teal-600 transition duration-500 shadow-lg"
          onClick={handleButtonClick} // Call the handleButtonClick function on button click
        >
          Book Now ..
        </button>
      </div>
    </div>
  );
};

export default Homepage;
