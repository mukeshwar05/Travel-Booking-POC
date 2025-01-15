const db = require('./bookingDb');

const dbQuery = (method, query, params) => {
  return new Promise((resolve, reject) => {
    db[method](query, params, function (err, result) {
      if (err) return reject(err);

      if (method === 'run') {
        resolve({ changes: this.changes, lastID: this.lastID });
      } else {
        resolve(result);
      }
    });
  });
};


const getDbAll = (query, params) => dbQuery('all', query, params);
const getDbGet = (query, params) => dbQuery('get', query, params);
const runDb = (query, params) => dbQuery('run', query, params);


exports.createBooking = async (booking_id, customer_name, booking_date, amount, vendor) => {
  const query = `
    INSERT INTO bookings (booking_id, customer_name, booking_date, amount, vendor)
    VALUES (?, ?, ?, ?, ?)
  `;
  try {
    await runDb(query, [booking_id, customer_name, booking_date, amount, vendor]);
  } catch (err) {
    throw new Error(`Error creating booking: ${err.message}`);
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
    throw new Error(`Error fetching bookings: ${err.message}`);
  }
};

exports.getBookingById = async (booking_id) => {
  const query = 'SELECT * FROM bookings WHERE booking_id = ?';

  try {
    return await getDbGet(query, [booking_id]);
  } catch (err) {
    throw new Error(`Failed to fetch booking: ${err.message}`);
  }
};

exports.deleteBooking = async (booking_id) => {
  const query = 'DELETE FROM bookings WHERE booking_id = ?';

  try {
    const { changes } = await runDb(query, [booking_id]);
    return changes;
  } catch (err) {
    throw new Error(`Error deleting booking: ${err.message}`);
  }
};
