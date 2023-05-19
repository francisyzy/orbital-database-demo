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

  // Perform database operation
  const updateQuery = `UPDATE users SET email = 'newemail@example.com' WHERE id = 1`;

  connection.query(updateQuery, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    console.log('Update query executed successfully:', updateQuery);

    // Closing the connection
    connection.end();
  });
});

