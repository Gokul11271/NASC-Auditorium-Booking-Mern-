import sendConfirmationMail from "./utils/sendMail.js";

// Dummy test email
const testEmail = "testemail@example.com";
const bookingDetails = {
  event: "Test Event",
  date: "2025-03-15",
  slot: "Morning",
};

// Call the function to send email
sendConfirmationMail(testEmail, bookingDetails);
