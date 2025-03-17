import sendConfirmationMail from "./utils/sendMail.js";

// Dummy test email
const testEmail = "mouniganatarajan@gmail.com";
const bookingDetails = {
  event: "Test Event",
  date: "2025-03-29",
  slot: "Morning",
};

// Call the function to send email
sendConfirmationMail(testEmail, bookingDetails);
