const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./src/bookings.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database.');
  }
});

module.exports = db;
