import nodemailer from "nodemailer";

const sendConfirmationMail = async (userEmail, bookingDetails) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Add this in your .env
        pass: process.env.EMAIL_PASSWORD, // Add this in your .env
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Auditorium Booking Confirmation",
      text: `Your booking has been confirmed!\n\nDetails:\nEvent: ${bookingDetails.event}\nDate: ${bookingDetails.date}\nSlot: ${bookingDetails.slot}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
};

export default sendConfirmationMail; // <-- Use export default for consistency
