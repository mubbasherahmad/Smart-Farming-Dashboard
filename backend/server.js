// import cors from "cors";
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const allowedOrigins = [
  "http://localhost:3000",           // dev frontend
  "http://13.210.133.33:5001"        // deployed frontend
];
dotenv.config();


const app = express();

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
// Add this line with your other route imports
app.use('/api/sensors', require('./routes/sensorRoutes'));
app.use('/api/irrigation', require('./routes/irrigationRoutes'));
//app.use('/api/tasks', require('./routes/taskRoutes'));

// Export the app object for testing
if (require.main === module) {
    connectDB();
    // If the file is run directly, start the server
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }




module.exports = app