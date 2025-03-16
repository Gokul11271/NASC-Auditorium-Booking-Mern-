import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const sendConfirmationMail = async (userEmail, bookingDetails) => {
  try {
    console.log(`Attempting to send email to: ${userEmail}`);

    // Verify environment variables are loaded
    if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
      throw new Error("Missing email credentials in environment variables.");
    }

    // Create transporter object
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD, // Use App Password if 2FA is enabled
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Auditorium Booking Confirmation",
      text: `Your booking is confirmed!\nEvent: ${bookingDetails.event}\nDate: ${bookingDetails.date}\nSlot: ${bookingDetails.slot}`,
    };

    console.log("Sending email...");
    const info = await transporter.sendMail(mailOptions);
    console.log(" Email sent successfully:", info.response);
  } catch (error) {
    console.error(" Error sending email:", error);
  }
};

export default sendConfirmationMail;
