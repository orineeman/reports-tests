import nodemailer from "nodemailer";

async function sendEmail(subject, message, email) {
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
    from: process.env.EMAIL,
    to: email,
    subject,
    text: message,
  };

  try {
    await transport.sendMail(mailOptions);
  } catch (err) {
    console.log("SEND EMAIL ERROR", err);
  }
}

export default sendEmail;
