const mysql = require('mysql2');

// Creating a connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'orbital-demo',
  ssl: { rejectUnauthorized: true },
});

// Connecting to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the database!');

  // unfortunately, as the foreign keys are not constrained in the database level, it is possible for the user details
  // to be deleted even if there are notes/notebooks
  // Perform database operation
  const deleteQuery = `DELETE FROM users WHERE id = 1`;

  connection.query(deleteQuery, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    console.log('Delete query executed successfully:', deleteQuery);

    // Closing the connection
    connection.end();
  });
});
