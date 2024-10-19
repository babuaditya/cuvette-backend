const { generateOtp, sendOtpEmail, sendOtpSMS } = require('../utils/otpGenerator');

module.exports = async (req, res, next) => {
  const { phone, companyEmail } = req.body;

  // Generate OTP
  const otp = generateOtp();

  // Send OTP to email
  await sendOtpEmail(companyEmail, otp);

  // Send OTP to phone
  await sendOtpSMS(phone, otp);


  req.otp = otp;

  next();
};
