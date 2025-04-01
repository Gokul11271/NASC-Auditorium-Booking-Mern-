Auditorium Booking System (MERN Stack)

Overview
The Auditorium Booking System is a web-based application designed to facilitate the seamless booking of an auditorium. Built with the MERN (MongoDB, Express.js, React.js, Node.js) stack, this system allows users to request bookings and enables administrators to manage and approve reservations efficiently.

Features
- User Booking Requests: Users can submit requests for booking the auditorium by providing details like name, department, date, and duration.
- Slot-Based Booking**:
  - Morning Slot (Yellow indicator)
  - Afternoon Slot (Blue indicator)
  - Full-Day Booking (Red indicator - no further bookings allowed for the day)
- Admin Dashboard**:
  - View, approve, or disapprove bookings.
  - Search and filter bookings.
  - Print booking records for documentation.
- Real-Time Updates: Bookings update instantly upon status changes.
- Responsive Design: Accessible on both desktop and mobile devices.

 Tech Stack
 Frontend
- React.js
- Tailwind CSS
- Axios for API requests

Backend
- Node.js
- Express.js
- MongoDB (Mongoose for schema modeling)

Deployment
- Frontend: Vercel
- Backend : Vercel
- Database: MongoDB Atlas

Installation Guide
 Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB (or use MongoDB Atlas)

 Steps
1. Clone the Repository
   ```sh
   git clone https://github.com/Gokul11271/nasc-auditorium-booking-mern.git
   cd nasc-auditorium-booking-mern
   ```

2. Backend Setup
   ```sh
   cd backend
   npm install
   npm start
   ```
   The server runs on `http://localhost:5000`

3. **Frontend Setup**
   ```sh
   cd frontend
   npm install
   npm start
   ```
   The React app runs on `http://localhost:3000`

API Endpoints
 Bookings
| Method | Endpoint                  | Description                      |
|--------|---------------------------|----------------------------------|
| GET    | `/bookings`               | Fetch all bookings              |
| POST   | `/bookings`               | Create a new booking            |
| PATCH  | `/bookings/:id`           | Update booking status           |
| DELETE | `/bookings/:id`           | Delete a booking (Admin only)   |

Usage
1. User:
   - Submit a booking request.
   - Check the status of bookings.
2. Admin:
   - View pending bookings.
   - Approve or disapprove requests.
   - Print booking details.

 Future Enhancements
- Add authentication (Admin/User roles).
- Implement email notifications for approvals and rejections.
- Integrate a calendar view for better booking management.

 Contributors
- Gokul R - [GitHub](https://github.com/Gokul11271) | [LinkedIn](https://linkedin.com/in/gokul04developer)

License
This project is licensed under the MIT License.

---
Made with ❤️ by Gokul R

