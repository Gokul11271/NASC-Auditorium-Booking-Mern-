import nodemailer from "nodemailer";

const sendConfirmationMail = async (userEmail, bookingDetails) => {
  try {
    console.log("Preparing to send email...");

    if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
      throw new Error("Missing email credentials in environment variables.");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Auditorium Booking Confirmation",
      text: `Your booking is confirmed!\nEvent: ${bookingDetails.event}\nDate: ${bookingDetails.date}\nSlot: ${bookingDetails.slot}`,
    };

    console.log("Sending email to:", userEmail);
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

export default sendConfirmationMail;
