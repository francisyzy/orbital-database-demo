const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'orbital-demo',
  ssl: { rejectUnauthorized: true },
  multipleStatements: true,
});

// Connecting to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the database!');

  // Perform database operations
  const insertStatements = `
    -- Insert into User table
    INSERT INTO users (id, email, username, password_hash) VALUES (1, 'user1@example.com', 'user1', 'hash1');
    INSERT INTO users (email, username, password_hash) VALUES ('user2@example.com', 'user1', 'hash1');
    INSERT INTO users (email, username, password_hash) VALUES ('user3@example.com', 'user2', 'hash2');
    INSERT INTO users (email, username, password_hash) VALUES ('user4@example.com', 'user3', 'hash3');

    -- Insert into Notebook table
    INSERT INTO notebooks (name, description, created_at, created_by) VALUES ('Notebook 1', 'Blue', NOW(), 1);
    INSERT INTO notebooks (name, description, created_at, created_by) VALUES ('Notebook 2', 'Green', NOW(), 2);
    INSERT INTO notebooks (name, description, created_at, created_by) VALUES ('Notebook 3', 'Red', NOW(), 1);

    -- Insert into Note table
    INSERT INTO notes (title, content, created_at, notebook_id) VALUES ('Note 1', 'Content 1', NOW(), 1);
    INSERT INTO notes (title, content, created_at, notebook_id) VALUES ('Note 2', 'Content 2', NOW(), 2);
    INSERT INTO notes (title, content, created_at, notebook_id) VALUES ('Note 3', 'Content 3', NOW(), 1);
  `;

  connection.query(insertStatements, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    console.log('Query executed successfully:', query);
  });

  // Closing the connection
  connection.end();
});
