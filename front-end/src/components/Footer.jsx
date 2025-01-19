import React from "react";

const Footer = () => { 
  return (
    <footer className="bg-gray-900 text-white py-4" style={{ margin: 0 }}>
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Auditorium Booking System. All
          rights reserved..
        </p>
        <p className="text-sm mt-2">
          Developed by:{" "}
          <span className="font-semibold">
            Gokul, Sachin, Muthuraj, Moni, Ilakkeshwaran, Prajth .
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
