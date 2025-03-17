import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Booking from "./bookings/users.booking.js";
import Canceling from "./cancelings/cancelForms.js";
import DisapprovedBooking from "./bookings/DisapprovedBooking.js";
import Login from "./logins/login.model.js";
import cors from "cors";
import nodemailer from "nodemailer";
import twilio from "twilio";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
export default app; 
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());
// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://auditorium-booking.nandha.org",
      "http://localhost:3000",
      "http://localhost:5000",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Handle CORS preflight requests
app.options('*', cors());

// Connect to MongoDB
connectDB();



// Twilio client setup for WhatsApp notifications
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const whatsappNumber = `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`;


// ================= Routes ================= //

// Get all bookings

app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});





// Create a new booking and send WhatsApp confirmation
// app.post("/booking", async (req, res) => {
//   try {
//     const {
//       name,
//       mobileNumber,
//       eventName,
//       dateofBooking,
//       duration,
//       department,
//       college,
//     } = req.body;

//     if (
//       !name ||
//       !mobileNumber ||
//       !eventName ||
//       !dateofBooking ||
//       !duration ||
//       !department ||
//       !college
//     ) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required." });
//     }

//     const newBooking = new Booking(req.body);
//     await newBooking.save();

//     res.status(201).json({ success: true, data: newBooking });

//     // Send WhatsApp message
//     try {
//       const messageBody = `Hello ${name}, your booking for the event \"${eventName}\" on ${dateofBooking} has been successfully submitted and approved. Thank you! Booking ID: ${newBooking._id}`;

//       await client.messages.create({
//         body: messageBody,
//         from: whatsappNumber,
//         to: `whatsapp:+91${mobileNumber}`,
//       });
//     } catch (whatsappError) {
//       console.error("Failed to send WhatsApp message:", whatsappError.message);
//     }
//   } catch (error) {
//     console.error("Error in booking:", error.message);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// });
app.post("/booking", async (req, res) => {
  try {
    console.log("🔥 New Booking Request Received:", req.body);

    const newBooking = new Booking(req.body);
    await newBooking.save();

    console.log("✅ Booking saved to the database:", newBooking);

    res.status(201).json({ success: true, data: newBooking });
  } catch (error) {
    console.error("❌ Error in booking:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


// Update booking status (approve/disapprove)
app.patch("/bookings/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "disapproved"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (status === "disapproved") {
      const disapprovedBooking = new DisapprovedBooking({
        name: booking.name,
        mobileNumber: booking.mobileNumber,
        eventName: booking.eventName,
        dateofBooking: booking.dateofBooking,
        duration: booking.duration,
        department: booking.department,
        status: "disapproved",
      });

      await disapprovedBooking.save();
      await Booking.findByIdAndDelete(booking._id);

      // Notify user about disapproval
      await client.messages.create({
        body: `Hello ${booking.name}, your booking for the event \"${booking.eventName}\" on ${booking.dateofBooking} has been disapproved.`,
        from: whatsappNumber,
        to: `whatsapp:+91${booking.mobileNumber}`,
      });
    } else {
      booking.status = status;
      await booking.save();
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.error("Error updating booking status:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Get disapproved bookings
app.get("/disapprovedbookings", async (req, res) => {
  try {
    const disapprovedbookings = await DisapprovedBooking.find();

    const disapprovedbookingsByDate = disapprovedbookings.reduce(
      (acc, booking) => {
        const date = booking.dateofBooking;
        if (!acc[date]) acc[date] = [];
        acc[date].push(booking);
        return acc;
      },
      {}
    );

    const normalizeddisapprovedbookings = Object.entries(
      disapprovedbookingsByDate
    ).flatMap(([date, disapprovedbookings]) => {
      const durations = disapprovedbookings.map((booking) => booking.duration);
      const fullDay =
        durations.includes("Morning") && durations.includes("Afternoon");

      return disapprovedbookings.map((booking) => ({
        ...booking.toObject(),
        duration: fullDay ? "Full day" : booking.duration,
      }));
    });

    res
      .status(200)
      .json({ success: true, data: normalizeddisapprovedbookings });
  } catch (error) {
    console.error("Error fetching disapproved bookings:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Submit a cancellation request
app.post("/canceling", async (req, res) => {
  try {
    const { bookingid, name, mobilenumber, department, reason } = req.body;

    if (!bookingid || !name || !mobilenumber || !department || !reason) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const newCanceling = new Canceling(req.body);
    await newCanceling.save();
    res.status(201).json({ success: true, data: newCanceling });
  } catch (error) {
    console.error("Error in Canceling", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Get all cancellation requests
app.get("/canceling", async (req, res) => {
  try {
    const cancelRequests = await Canceling.find();
    res.status(200).json({ success: true, data: cancelRequests });
  } catch (error) {
    console.error("Error fetching cancelation requests:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Update cancellation request status
app.patch("/canceling/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "disapproved"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const canceling = await Canceling.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!canceling) {
      return res
        .status(404)
        .json({ success: false, message: "Cancellation request not found" });
    }

    let messageBody;

    if (status === "approved") {
      const deletedBooking = await Booking.findByIdAndDelete(
        canceling.bookingid
      );
      if (!deletedBooking) {
        return res
          .status(404)
          .json({ success: false, message: "Associated booking not found" });
      }
      messageBody = `Hello ${canceling.name}, your cancellation request for booking ID: ${canceling.bookingid} has been approved. The booking has been canceled successfully.`;
    } else {
      messageBody = `Hello ${canceling.name}, your cancellation request for booking ID: ${canceling.bookingid} has been disapproved. The booking remains active.`;
    }

    await client.messages.create({
      body: messageBody,
      from: whatsappNumber,
      to: `whatsapp:+91${canceling.mobilenumber}`,
    });

    res.status(200).json({ success: true, data: canceling });
  } catch (error) {
    console.error("Error updating cancellation request status:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// User login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Enter all fields" });
    }

    const user = await Login.findOne({ email });

    if (!user || password !== user.password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({
      success: true,
      message: `${user.role} login successful`,
      role: user.role,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
