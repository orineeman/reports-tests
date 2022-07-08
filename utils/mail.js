import nodemailer from "nodemailer";

async function sendEmail(subject, message, email) {
  console.log("sendEmail");
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL, // Sender address
    to: email, // List of recipients
    subject,
    message,
  };

  try {
    await transport.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
}

export default sendEmail;
