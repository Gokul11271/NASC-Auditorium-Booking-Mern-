import mongoose from "mongoose";
import sendConfirmationMail from "../utils/sendMail.js"; // Import the email function

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true }, // Add this field
    mobileNumber: { type: Number, required: true },
    eventName: { type: String, required: true },
    dateofBooking: { type: String, required: true },
    duration: { type: String, required: true },
    department: { type: String, required: true },
    college: { type: String, required: true },
    status: {
      type: String,
      enum: ["approved", "disapproved"],
      default: "approved",
    },
  },
  {
    timestamps: true,
  }
);

// Send email only when the booking is approved
bookingSchema.post("save", async function (doc) {
  try {
    if (doc.status === "approved") {
      const bookingDetails = {
        event: doc.eventName,
        date: doc.dateofBooking,
        slot: doc.duration,
      };
      await sendConfirmationMail(doc.email, bookingDetails); // <-- Using the email field here
    }
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
  }
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
