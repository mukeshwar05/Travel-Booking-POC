const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./src/bookings.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  console.log('Connected to SQLite database.');

  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_id TEXT NOT NULL UNIQUE,
      customer_name TEXT NOT NULL,
      booking_date TEXT NOT NULL,
      amount REAL NOT NULL,
      vendor TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error creating bookings table:', err.message);
    } else {
      console.log('Bookings table ready.');
    }
  });
});

module.exports = db;
