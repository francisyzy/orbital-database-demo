require('dotenv').config(); // Load environment variables from .env file
const { Sequelize } = require('sequelize');
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql', // Specify the dialect explicitly
});

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    sequelize.close(); // Closing the connection
  }
})();

// Middleware to parse JSON request bodies
app.use(express.json());

// Mounting the user routes
app.use('/', userRoutes);

// Starting the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
