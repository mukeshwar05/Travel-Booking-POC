const db = require('./bookingDb');

const createTables = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS vendors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error creating vendors table:', err.message);
    } else {
      console.log('Vendors table created or already exists.');
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_id TEXT NOT NULL UNIQUE,
      customer_name TEXT NOT NULL,
      booking_date TEXT NOT NULL,
      amount REAL NOT NULL,
      vendor_id INTEGER NOT NULL,
      FOREIGN KEY (vendor_id) REFERENCES vendors(id)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating bookings table:', err.message);
    } else {
      console.log('Bookings table created or already exists.');
    }
  });
};

createTables();

module.exports = createTables;
