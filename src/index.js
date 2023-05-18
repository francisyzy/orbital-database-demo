require('dotenv').config(); // Load environment variables from .env file
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql' // Specify the dialect explicitly
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
