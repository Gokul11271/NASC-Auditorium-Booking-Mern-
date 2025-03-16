import mongoose from "mongoose";
import sendConfirmationMail from "../utils/sendMail.js"; // Import the email function

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
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

// Send email only when a new booking is approved
bookingSchema.post("save", function (doc) {
  console.log(`Booking saved. Status: ${doc.status}`);

  if (doc.status === "approved" && doc.isNew) {
    const bookingDetails = {
      event: doc.eventName,
      date: doc.dateofBooking,
      slot: doc.duration,
    };

    console.log(`Sending email to: ${doc.email}`);

    // Use process.nextTick to ensure the email sends after saving
    process.nextTick(async () => {
      try {
        await sendConfirmationMail(doc.email, bookingDetails);
        console.log("Email sent successfully.");
      } catch (error) {
        console.error("Failed to send confirmation email:", error.message);
      }
    });
  }
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
