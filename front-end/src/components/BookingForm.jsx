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
      await axios.post("http://localhost:5000/booking", formData);
      alert("Booking successful!");

      // Refresh bookings to reflect new data
      const updatedBookings = await axios.get("http://localhost:5000/bookings");
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

  // Disable fully booked dates on the calendar
  const isTileDisabled = ({ date }) => {
    const booking = bookings.find(
      (b) => new Date(b.dateofBooking).toDateString() === date.toDateString()
    );
    return booking?.duration === "Full day";
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

      {/* Calendar Component */}
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
          formData.dateofBooking ? new Date(formData.dateofBooking) : new Date()
        }
        tileClassName={({ date }) => getTileClass({ date })}
        tileDisabled={({ date }) => isTileDisabled({ date })}
        className="react-calendar mx-auto"
      />

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
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Submit Booking
      </button>
    </form>
  );
};

export default BookingForm;
 