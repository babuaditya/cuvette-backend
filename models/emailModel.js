const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema({
  templateName: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,  // Body of the email template with placeholders
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',     // Assuming you have a User model for authenticated users
    required: true,
  },
}, { timestamps: true });

const EmailTemplate = mongoose.model('EmailTemplate', emailTemplateSchema);

module.exports = EmailTemplate;
