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
      .get("https://nasc-auditorium-booking-mern.vercel.app/bookings")
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
    const fulldaybooked = bookings.some(
      (b) =>
        new Date(b.dateofBooking).toDateString() === date.toDateString() &&
        b.duration === "Full day"
    );
    const morningBooked = bookings.some(
      (b) =>
        new Date(b.dateofBooking).toDateString() === date.toDateString() &&
        b.duration === "Morning"
    );

    const afternoonBooked = bookings.some(
      (b) =>
        new Date(b.dateofBooking).toDateString() === date.toDateString() &&
        b.duration === "Afternoon"
    );

    if (fulldaybooked || (morningBooked && afternoonBooked))
      return "full-day-booked"; // Red (both slots booked)
    if (morningBooked) return "morning-booked"; // Yellow (morning booked)
    if (afternoonBooked) return "afternoon-booked"; // Blue (afternoon booked)

    return "";
  };

  const isTileDisabled = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    if (date < today || date > maxDate) {
      return true;
    }

    const morningBooked = bookings.some(
      (b) =>
        new Date(b.dateofBooking).toDateString() === date.toDateString() &&
        b.duration === "Morning"
    );

    const afternoonBooked = bookings.some(
      (b) =>
        new Date(b.dateofBooking).toDateString() === date.toDateString() &&
        b.duration === "Afternoon"
    );

    return morningBooked && afternoonBooked; // Disable date if both slots are booked
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
        <option value="ncn">Nandha BED Teacher Training </option>
        <option value="ncn">Nandha Academy of Allied Health Sciences</option>
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
          tileClassName={getTileClass}
          tileDisabled={isTileDisabled}
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
