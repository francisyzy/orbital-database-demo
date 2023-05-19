const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  'orbital_local',
  'root',
  'root',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})()