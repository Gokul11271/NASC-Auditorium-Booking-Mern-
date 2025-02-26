import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsResponse = await axios.get(
          "https://nasc-auditorium-booking-mern.vercel.app/bookings"
        );

        setBookings(bookingsResponse.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const filteredBookings = bookings.filter((booking) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      booking.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      booking.department.toLowerCase().includes(lowerCaseSearchTerm) ||
      formatDate(booking.dateofBooking).includes(lowerCaseSearchTerm) ||
      booking.duration.toLowerCase().includes(lowerCaseSearchTerm) ||
      booking.college.toLowerCase().includes(lowerCaseSearchTerm) ||
      booking.status.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  if (loading)
    return (
      <p className="text-center mt-4 text-lg font-medium text-gray-600">
        Loading data...
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Auditorium Bookings
        </h1>

        <section className="mb-12 p-6 bg-blue-50 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Bookings
          </h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search bookings by name, department, date, duration, or status"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm text-gray-700">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-2 border">Booking ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Mobile Number</th>
                  <th className="px-4 py-2 border">Event Name</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Duration</th>
                  <th className="px-4 py-2 border">Department</th>
                  <th className="px-4 py-2 border">College</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-gray-100 text-center"
                  >
                    <td className="px-4 py-2 border">{booking._id}</td>
                    <td className="px-4 py-2 border">{booking.name}</td>
                    <td className="px-4 py-2 border">{booking.mobileNumber}</td>
                    <td className="px-4 py-2 border">{booking.eventName}</td>
                    <td className="px-4 py-2 border">
                      {formatDate(booking.dateofBooking)}
                    </td>
                    <td className="px-4 py-2 border">{booking.duration}</td>
                    <td className="px-4 py-2 border">{booking.department}</td>
                    <td className="px-4 py-2 border">{booking.college}</td>
                    <td className="px-4 py-2 border">{booking.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
