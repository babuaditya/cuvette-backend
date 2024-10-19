const { registerUser, verifyOtp,verifyPhone, sendMagicLink, verifyEmail, getUserInfo } = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User registered, OTP sent to email', userId: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.verifyEmail = async (req, res) => {
  try {
    const token = await verifyEmail(req.body.userId, req.body.emailOtp); 
    res.json({ message: 'OTP verified', token });
  } catch (error) {
    console.log("error occured")
    res.status(400).json({ error: error.message });
  }
};
exports.verifyPhone = async (req, res) => {
  try {
    const {user,cookie} = await verifyPhone(req.body.userId, req.body.phoneOtp); 
    // if(cookie){
    //   res.cookie('authToken', cookie, {
    //     // httpOnly: true, // Accessible only by the web server
    //     secure: false ,// Use HTTPS in production
    //     sameSite: 'none', // Protect against CSRF
    //     maxAge: 24 * 60 * 60 * 1000 
    //   });
    // }
    res.json({ message: 'OTP verified', token:user,cookie:cookie });
  } catch (error) {
    console.log("error occured")
    res.status(400).json({ error: error.message });
  }
};


exports.verifyOtp = async (req, res) => {
  try {
    const token = await verifyOtp(req.body.email, req.body.otp);
    res.json({ message: 'OTP verified', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginWithMagicLink = async (req, res) => {
  try {
    await sendMagicLink(req.body.email);
    res.json({ message: 'Magic link sent to email' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getUserInfo = async (req, res) => {

  try {
    const userId = req.user.id;
    const user=await getUserInfo(req.user.userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({
      message: 'User information retrieved successfully',
      data: user
    });
  } catch (error) {
    console.error('Error retrieving user information:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


