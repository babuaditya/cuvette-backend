// controllers/emailController.js
const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service provider (Gmail, Outlook, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS  // Your email password or app-specific password
  }
});

// Controller to send an email
const sendEmail = async (req, res) => {
  const { jobTitle, jobDescription, experience, endDate, candidatesEmails,companyName } = req.body;

  // Validate input
  if (!jobTitle || !jobDescription || !experience || !endDate || !candidatesEmails) {
    return res.status(400).json({ message: 'Please provide all fields: jobTitle, jobDescription, experience, endDate, and candidatesEmails.' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: candidatesEmails, 
    subject: `Job Opportunity: ${jobTitle}`,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #333;">Job Opportunity: ${jobTitle}</h2>
          <p><strong>Description:</strong> ${jobDescription}</p>
          <p><strong>Experience Level:</strong> ${experience}</p>
          <p><strong>End Date to Apply:</strong> ${endDate}</p>
          <h3 style="color: #555;">Candidates:</h3>
          <ul>
            ${candidatesEmails.map(email => `<li>${email}</li>`).join('')}
          </ul>
          <p>Best Regards,<br>${companyName}</p>
        </body>
      </html>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return res.status(200).json({ message: 'Email sent successfully!', info: info.response });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
};

module.exports = {
  sendEmail,
};
