const db = require('./bookingDb');
const getDbAll = (query, params) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        return reject(err); 
      }
      resolve(rows); 
    });
  });
};

const getDbGet = (query, params) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) {
        return reject(err); 
      }
      resolve(row); 
    });
  });
};

const runDb = (query, params) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function(err) {
      if (err) {
        return reject(err); 
      }
      resolve({ changes: this.changes, lastID: this.lastID }); 
    });
  });
}

exports.createBooking = async (booking_id, customer_name, booking_date, amount, vendor) => {
  const query = `
    INSERT INTO bookings (booking_id, customer_name, booking_date, amount, vendor)
    VALUES (?, ?, ?, ?, ?)
  `;
  try {
    const bookingId = await runDb(query, [booking_id, customer_name, booking_date, amount, vendor]);
  } catch (err) {
    throw new Error('Error creating booking: ' + err.message);
  }
};

exports.getBookings = async (booking_date, vendor) => {
  let query = 'SELECT * FROM bookings WHERE 1=1';
  const params = [];

  if (booking_date) {
    query += ' AND booking_date = ?';
    params.push(booking_date);
  }

  if (vendor) {
    query += ' AND vendor = ?';
    params.push(vendor);
  }

  try {
    return await getDbAll(query, params);
  } catch (err) {
    throw new Error('Error fetching bookings: ' + err.message);
  }
};

exports.getBookingById = async (booking_id) => {
  try {
    const query = `SELECT * FROM bookings WHERE booking_id = ?`;
    const row = await getDbGet(query, [booking_id]);
    return row;
  } catch (err) {
    throw new Error('Failed to fetch booking: ' + err.message);
  }
};

exports.deleteBooking = async (booking_id) => {
  const query = `DELETE FROM bookings WHERE booking_id = ?`;

  try {
    const result = await runDb(query, [booking_id]);
    return result.changes; 
  } catch (err) {
    throw new Error('Error deleting booking: ' + err.message);
  }
};
