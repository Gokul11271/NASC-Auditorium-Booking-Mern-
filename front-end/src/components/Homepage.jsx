import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./img/Pi7_NASC LOGO.png"; // Ensure this is the correct path
import first from "./img/first.mp4"; // Ensure this is the correct path

const Homepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check user login status
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear session
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login
  };

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
        {/* Logo and Title */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-32 mr-4 translate-y-1" />

          <h2 className="text-white font-semibold text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl text-center max-w-[90%] sm:max-w-full break-words leading-tight">
            NANDHA ARTS AND SCIENCE COLLEGE (AUTONOMOUS)
          </h2>
        </div>

        {/* Toggle Menu Button (Visible on small screens) */}
        <button
          className="text-white text-3xl md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Navigation Menu */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-20 left-0 w-full bg-black bg-opacity-75 text-white md:static md:flex md:bg-transparent md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row items-center md:gap-6 text-center">
            <li className="py-2 md:py-0">
              <Link
                to="/"
                className="block px-4 py-2 hover:text-teal-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link
                to="/about"
                className="block px-4 py-2 hover:text-teal-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link
                to="/contact"
                className="block px-4 py-2 hover:text-teal-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link
                to="/bookingform"
                className="block px-4 py-2 hover:text-teal-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                BookingForm
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link
                to="/cancelingform"
                className="block px-4 py-2 hover:text-teal-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                CancelingForm
              </Link>
            </li>

            {/* Show Login or Logout button based on user status */}
            {!isLoggedIn ? (
              <li className="py-2 md:py-0">
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:text-teal-400 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
            ) : (
              <li className="py-2 md:py-0">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-red-500 hover:text-red-400 transition"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
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
