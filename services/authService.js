const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { generateOtp, sendOtpEmail,sendOtpSMS } = require('../utils/otpGenerator');
const { createAccessToken, createRefreshToken } = require('../utils/jwtUtil');

const registerUser = async (userData) => {
  const { name, phone, companyName, companyEmail, employeeSize } = userData;
  let user = await User.findOne({ phone });
  if (user) throw new Error(JSON.stringify(user));

  const emailOtp = generateOtp();
  const phoneOtp = generateOtp();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); 

  user = new User({ name, phone, companyName, companyEmail, employeeSize, emailOtp,phoneOtp,otpExpiry });
  await user.save();

  await sendOtpEmail(user.companyEmail, emailOtp);
  await sendOtpSMS(user.phone, phoneOtp);

  return user;
};
const verifyEmail=async (userId,otp)=>{
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    console.log(user.emailOtp)
    console.log(otp)
  if (user.emailOtp === otp ){
    user.emailVerified = true;
    user.otp = undefined; 
    user.otpExpiry = undefined;
    await user.save();
    return user;
  }

}
const verifyPhone=async (userId,otp)=>{
  const user = await User.findById(userId);
  let cookie=null
  if (!user) {
    throw new Error('User not found');
  }
  console.log(otp)
if (user.phoneOtp === otp ){
  user.phoneVerified = true;
  user.otp = undefined; 
  user.otpExpiry = undefined;
  await user.save();
  if(user.emailVerified){
     cookie = createAccessToken(user); // Assuming you have a function to generate JWT
       
  }
  return {user,cookie};
}

}
const verifyOtp = async (companyEmail, otp) => {

  const user = await User.findOne({ companyEmail});
  if (!user) throw new Error('User not found');
  
  if (user.emailOtp !== otp );

  user.emailVerified = true;
  user.otp = undefined; 
  user.otpExpiry = undefined;
  await user.save();

  return createAccessToken(user);
};
const getUserInfo = async (id) => {
  const user = await User.findById(id);
    if(!user) throw new Error('No user found')
      return user;
};

const sendMagicLink = async (email) => {
  const user = await User.findOne({ companyEmail: email });
  if (!user || !user.emailVerified) throw new Error('Invalid user or unverified');

  const token = createAccessToken(user);
  await sendOtpEmail(email, `Your magic login link: ${process.env.BASE_URL}/auth/login?token=${token}`);
};


module.exports = { registerUser,verifyEmail,verifyPhone, verifyOtp, sendMagicLink,getUserInfo };
