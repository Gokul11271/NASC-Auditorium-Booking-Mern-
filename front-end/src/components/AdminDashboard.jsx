import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [cancelRequests, setCancelRequests] = useState([]);
  const [disapprovedBookings, setDisapprovedBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsResponse, cancelRequestsResponse, disapprovedResponse] =
          await Promise.all([
            axios.get("http://localhost:5000/bookings"),
            axios.get("http://localhost:5000/canceling"),
            axios.get("http://localhost:5000/disapprovedbookings"),
          ]);

        setBookings(bookingsResponse.data.data || []);
        setCancelRequests(cancelRequestsResponse.data.data || []);
        setDisapprovedBookings(disapprovedResponse.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateBookingStatus = async (id, status) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/bookings/${id}`,
        { status }
      );
      if (response.data.success) {
        alert(`Booking ${status} successfully!`);
        setBookings(
          bookings.map((booking) =>
            booking._id === id ? { ...booking, status } : booking
          )
        );
        if (status === "disapproved") {
          setDisapprovedBookings([...disapprovedBookings, response.data.data]);
        }
      }
    } catch (error) {
      console.error("Error updating booking status:", error.message);
      alert("Failed to update booking status.");
    }
  };

  const updateCancelStatus = async (id, status) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/canceling/${id}`,
        { status }
      );
      if (response.data.success) {
        alert(`Cancelation request ${status} successfully!`);
        setCancelRequests(
          cancelRequests.map((request) =>
            request._id === id ? { ...request, status } : request
          )
        );
        if (status === "approved") {
          setBookings(
            bookings.filter(
              (booking) => booking._id !== response.data.data.bookingid
            )
          );
        }
      }
    } catch (error) {
      console.error("Error updating cancelation status:", error.message);
      alert("Failed to update cancelation status.");
    }
  };

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
          Admin Dashboard
        </h1>

        {/* Bookings Section */}
        <section className="mb-12 p-6 bg-blue-50 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Bookings
          </h2>
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
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-gray-100 text-center"
                  >
                    <td className="px-4 py-2 border">{booking._id}</td>
                    <td className="px-4 py-2 border">{booking.name}</td>
                    <td className="px-4 py-2 border">{booking.mobileNumber}</td>
                    <td className="px-4 py-2 border">{booking.eventName}</td>
                    <td className="px-4 py-2 border">
                      {new Date(booking.dateofBooking).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border">{booking.duration}</td>
                    <td className="px-4 py-2 border">{booking.department}</td>
                    <td className="px-4 py-2 border">{booking.status}</td>
                    <td className="px-4 py-2 border">
                      {booking.status === "approved" && (
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                          onClick={() =>
                            updateBookingStatus(booking._id, "disapproved")
                          }
                        >
                          Disapprove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Cancelation Requests Section */}
        <section className="mb-12 p-6 bg-yellow-50 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-yellow-600 mb-4">
            Cancelation Requests
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm text-gray-700">
              <thead className="bg-yellow-500 text-white">
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Department</th>
                  <th className="px-4 py-2 border">Reason</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cancelRequests.map((request) => (
                  <tr
                    key={request._id}
                    className="hover:bg-gray-100 text-center"
                  >
                    <td className="px-4 py-2 border">{request.name}</td>
                    <td className="px-4 py-2 border">{request.department}</td>
                    <td className="px-4 py-2 border">{request.reason}</td>
                    <td className="px-4 py-2 border">{request.status}</td>
                    <td className="px-4 py-2 border">
                      {request.status === "pending" && (
                        <>
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition mx-1"
                            onClick={() =>
                              updateCancelStatus(request._id, "approved")
                            }
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition mx-1"
                            onClick={() =>
                              updateCancelStatus(request._id, "disapproved")
                            }
                          >
                            Disapprove
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Disapproved Bookings Section */}
        <section className="p-6 bg-gray-50 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            Disapproved Bookings
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm text-gray-700">
              <thead className="bg-gray-500 text-white">
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Mobile Number</th>
                  <th className="px-4 py-2 border">Event Name</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Duration</th>
                  <th className="px-4 py-2 border">Department</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {disapprovedBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-gray-100 text-center"
                  >
                    <td className="px-4 py-2 border">{booking.name}</td>
                    <td className="px-4 py-2 border">{booking.mobileNumber}</td>
                    <td className="px-4 py-2 border">{booking.eventName}</td>
                    <td className="px-4 py-2 border">
                      {new Date(booking.dateofBooking).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border">{booking.duration}</td>
                    <td className="px-4 py-2 border">{booking.department}</td>
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
