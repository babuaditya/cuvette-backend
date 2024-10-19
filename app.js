
const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Change to your frontend domain
    credentials: true // Allow cookies to be sent across domains
  }));
  

app.use('/auth', authRoutes);
app.use('/mail',emailRoutes)


connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
