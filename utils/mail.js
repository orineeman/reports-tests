import nodemailer from "nodemailer";

async function sendEmail(subject, message, email) {
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PABLIC_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: process.env.NEXT_PABLIC_EMAIL,
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
