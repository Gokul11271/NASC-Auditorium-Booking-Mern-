import React, { useState } from "react";
import axios from "axios";

const CancelForm = () => {
  const [formData, setFormData] = useState({
    bookingid: "",
    name: "",
    mobilenumber: "",
    department: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(formData).every((field) => field.trim() !== "")) {
      alert("All fields are required!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/canceling", formData);
      alert("Cancel request sent successfully!");
    } catch (error) {
      console.error("Error submitting cancel request:", error.message);
      alert("Failed to submit cancel request.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-700 text-center mb-6">
          Canceling Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Booking ID */}
          <div>
            <label
              htmlFor="bookingid"
              className="block text-sm font-semibold text-gray-700"
            >
              Booking ID
            </label>
            <input
              type="text"
              id="bookingid"
              name="bookingid"
              placeholder="Enter your Booking ID"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label
              htmlFor="mobilenumber"
              className="block text-sm font-semibold text-gray-700"
            >
              Mobile Number
            </label>
            <input
              type="text"
              id="mobilenumber"
              name="mobilenumber"
              placeholder="Enter your mobile number"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Department */}
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-semibold text-gray-700"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              placeholder="Enter your department"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Reason */}
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-semibold text-gray-700"
            >
              vaild Reason
            </label>
            <textarea
              id="reason"
              name="reason"
              placeholder="Provide a reason for cancelation"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Submit CancelRequest
          </button>
        </form>
      </div>
    </div>
  );
};

export default CancelForm;
