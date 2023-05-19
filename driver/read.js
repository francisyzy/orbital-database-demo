const mysql = require('mysql2');

// Creating a connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'orbital-demo',
  ssl: { rejectUnauthorized: true },
});

const email = 'user1@example.com';
// const password = 'hash1';
const password = `hash2 ' OR '1'='1`;

const query = `
  SELECT *
  FROM users
  WHERE email = ? AND password_hash = ?
`;

// Connecting to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the database!');

  // Perform database operations
  connection.execute(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    if (results.length === 0) {
      console.log('No user found with the provided email and password.');
    } else {
      console.log('User found!');
      console.log(results[0]);
    }

    // Closing the connection
    connection.end();
  });
});
