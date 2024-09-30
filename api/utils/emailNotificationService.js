// emailNotificationService.js

import nodemailer from 'nodemailer';

export const sendEmailNotification = async (userEmail, hotelDetails) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  // Define email content
  const mailOptions = {
    from: process.env.USER,
    to: userEmail,
    subject: 'New Hotel Added!',
    html: `<p>Hello,</p><p>A new hotel has been added: ${hotelDetails.name}</p>`,
  };

  // Send email
  await transporter.sendMail(mailOptions);
};