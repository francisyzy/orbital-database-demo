const mysql = require('mysql2');

// Creating a connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'orbital-demo',
});

// Connecting to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the database!');

  // Perform database operations
  const createTablesQuery = `
    -- Create User table
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE,
      username TEXT,
      password_hash TEXT
    );

    -- Create Notebook table
    CREATE TABLE IF NOT EXISTS notebooks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name TEXT,
      description TEXT,
      created_at DATETIME,
      created_by INT,
      KEY users_id_idx (created_by) 
    );

    -- Create Note table
    CREATE TABLE IF NOT EXISTS notes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title TEXT,
      content TEXT,
      created_at DATETIME,
      notebook_id INT,
      KEY notebooks_id_idx (notebook_id) 
    );
  `;

  const queries = createTablesQuery.split(';').filter(query => query.trim() !== '');

  queries.forEach(query => {
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return;
      }

      console.log('Query executed successfully:', query);
    });
  });

  // Closing the connection
  connection.end();
});
