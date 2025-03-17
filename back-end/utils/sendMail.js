import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const sendConfirmationMail = async (userEmail, bookingDetails) => {
  try {
    console.log("📨 Preparing to send email...");
    console.log(`📧 Email To: ${userEmail}`);
    console.log("📌 Booking Details:", bookingDetails);

    if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
      throw new Error("⚠️ Missing email credentials in environment variables.");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Auditorium Booking Team" <${process.env.EMAIL}>`,
      to: userEmail,
      subject: "✅ Your Booking is Confirmed",
      html: `
        <h2 style="color: blue;">Booking Confirmed 🎉</h2>
        <p>Hello <strong>${userEmail}</strong>,</p>
        <p>Your auditorium booking has been successfully confirmed.</p>
        <ul>
          <li><strong>Booking ID:</strong> ${bookingDetails.id}</li>
          <li><strong>Event:</strong> ${bookingDetails.event}</li>
          <li><strong>Date:</strong> ${bookingDetails.date}</li>
          <li><strong>Slot:</strong> ${bookingDetails.slot}</li>
        </ul>
        <p>Use this Booking ID for any future reference.</p>
        <p>Thank you for using our service!</p>
        <p><em>This is an automated email, please do not reply.</em></p>
      `,
    };

    console.log("🚀 Sending email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

export default sendConfirmationMail;
