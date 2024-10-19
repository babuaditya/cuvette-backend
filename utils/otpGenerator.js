const crypto = require('crypto');
const nodemailer = require('nodemailer');

const generateOtp = () => crypto.randomInt(100000, 999999).toString();

const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const message = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}`,
  };

  await transporter.sendMail(message);
};

const sendOtpSMS = async (phone, otp) => {
  const twilio = require('twilio');
  const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

  await client.messages.create({
    body: `Your OTP is: ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: `+91${phone}`,
  });
};

module.exports = { generateOtp, sendOtpEmail, sendOtpSMS };
