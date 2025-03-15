import nodemailer from "nodemailer";

const sendConfirmationMail = async (userEmail, bookingDetails) => {
  try {
    // Verify environment variables
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

    // Verify transporter connection
    await transporter.verify();
    console.log("Transporter ready to send emails!");

    const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Auditorium Booking Confirmation",
      text: `Your booking has been confirmed!\n\nDetails:\nEvent: ${bookingDetails.event}\nDate: ${bookingDetails.date}\nSlot: ${bookingDetails.slot}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending confirmation email:", error.message);
  }
};

export default sendConfirmationMail;
