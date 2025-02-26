import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./BookingForm.css"; // Custom styles for React Calendar

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    eventName: "",
    dateofBooking: "",
    duration: "",
    department: "",
    college: "",
  });

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch existing bookings from the server
    axios
      .get("http://localhost:5000/bookings")
      .then((response) => {
        console.log("Fetched bookings:", response.data);
        setBookings(response.data.data); // Ensure correct response structure
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error.message);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (
      !Object.values(formData).every(
        (field) => field && field.toString().trim() !== ""
      )
    ) {
      alert("All fields are required!");
      return;
    }

    // Check if the selected date and duration are already booked
    const isSlotBooked = bookings.some(
      (booking) =>
        new Date(booking.dateofBooking).toDateString() ===
          new Date(formData.dateofBooking).toDateString() &&
        booking.duration === formData.duration
    );

    if (isSlotBooked) {
      alert(
        `The ${formData.duration} slot for this date is already booked. Please choose a different slot or date.`
      );
      return;
    }

    try {
      await axios.post(
        "https://nasc-auditorium-booking-mern.vercel.app/booking",
        formData
      );
      alert("Booking successful!");

      // Refresh bookings to reflect new data
      const updatedBookings = await axios.get(
        "https://nasc-auditorium-booking-mern.vercel.app/bookings"
      );
      setBookings(updatedBookings.data.data);
    } catch (error) {
      console.error("Error submitting booking:", error.message);
      alert("Failed to submit booking.");
    }
  };

  // Get class for booking durations to highlight them on the calendar
  const getTileClass = ({ date }) => {
    const booking = bookings.find(
      (b) => new Date(b.dateofBooking).toDateString() === date.toDateString()
    );

    if (booking) {
      if (booking.duration === "Full day") return "full-day-booked";
      if (booking.duration === "Morning") return "morning-booked";
      if (booking.duration === "Afternoon") return "afternoon-booked";
    }
    return "";
  };

  // Disable fully booked dates and restrict date range on the calendar
  const isTileDisabled = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize time to midnight
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30); // Set max booking date to 30 days ahead

    if (date < today || date > maxDate) {
      return true; // Disable past and beyond 30-day range dates
    }

    const booking = bookings.find(
      (b) => new Date(b.dateofBooking).toDateString() === date.toDateString()
    );
    return booking?.duration === "Full day"; // Also disable fully booked dates
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Auditorium Booking Form
      </h1>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        name="mobileNumber"
        placeholder="Mobile Number"
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        name="eventName"
        placeholder="Event Name"
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        name="department"
        placeholder="Department"
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        name="college"
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select The College</option>
        <option value="nasc">Nandha Arts and Science College</option>
        <option value="npc">Nandha College of Pharmacy</option>
        <option value="npt">Nandha College of Physiotherapy</option>
        <option value="ncn">Nandha College of Nursing</option>
        <option value="nsn">Nandha School of Nursing</option>
        <option value="ncahs">Nandha College of Allied Health Sciences</option>
        <option value="naahs">Nandha Academy of Allied Health Sciences</option>
        <option value="nihs">Nandha Institute of Health Science</option>
        <option value="nmch">Nandha Medical College and Hospital</option>
        <option value="namch">
          Nandha Ayurveda Medical College and Hospital
        </option>
        <option value="nsmch">
          Nandha Siddha Medical College and Hospital
        </option>
        <option value="nnyc">
          Nandha Naturopathy and Yoga Medical College
        </option>
        <option value="ndch">Nandha Dental College and Hospital</option>
        <option value="nec">Nandha Engineering College</option>
        <option value="nct">Nandha College of Technology</option>
        <option value="npc">Nandha Polytechnic College</option>
        <option value="nce">Nandha College of Education</option>
        <option value="ntti">Nandha Teacher Training Institute</option>
        <option value="ncs">Nandha Central School</option>
        <option value="nccs">Nandha Central City School</option>
      </select>
      <select
        name="duration"
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select Time Duration</option>
        <option value="Full day">Full day</option>
        <option value="Morning">Morning</option>
        <option value="Afternoon">Afternoon</option>
      </select>
      <div className="flex items-center justify-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-red-500 rounded-full"></span>
          <span className="text-sm text-gray-700">Full Day Booked</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
          <span className="text-sm text-gray-700">Morning Booked</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
          <span className="text-sm text-gray-700">Afternoon Booked</span>
        </div>
      </div>

      {/* Calendar Component */}
      <div className="calendar-container">
        <Calendar
          onChange={(date) => {
            const adjustedDate = new Date(
              Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
            );
            setFormData({
              ...formData,
              dateofBooking: adjustedDate.toISOString(),
            });
          }}
          value={
            formData.dateofBooking
              ? new Date(formData.dateofBooking)
              : new Date()
          }
          tileClassName={({ date }) => getTileClass({ date })}
          tileDisabled={({ date }) => isTileDisabled({ date })}
          minDate={new Date()} // Prevent past dates selection
          maxDate={new Date(new Date().setDate(new Date().getDate() + 30))} // Limit to next 30 days
          next2Label={null} // Remove double next arrows
          prev2Label={null} // Remove double previous arrows
          navigationLabel={({ date }) =>
            `${date.toLocaleString("default", {
              month: "long",
            })} ${date.getFullYear()}`
          } // Prevent clicking on the header
        />
      </div>

      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-md ${
          Object.values(formData).every(
            (field) => field && field.toString().trim() !== ""
          )
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={
          !Object.values(formData).every(
            (field) => field && field.toString().trim() !== ""
          )
        }
      >
        Submit Booking
      </button>
    </form>
  );
};

export default BookingForm;
