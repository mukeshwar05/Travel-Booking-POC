const bookingRepoDb = require('../model/bookingDbRepo');

exports.createBooking = async (req, res) => {
  const { booking_id, customer_name, booking_date, amount, vendor } = req.body;

  if (!booking_id || !customer_name || !booking_date || !amount || !vendor) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await bookingRepoDb.createBooking(booking_id, customer_name, booking_date, amount, vendor);
    res.status(201).json({ message: 'Booking created successfully'});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create booking'});
  }
};

exports.getBookings = async (req, res) => {
  const { date: booking_date, vendor } = req.query;

  try {
    const rows = await bookingRepoDb.getBookings(booking_date, vendor);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

exports.getBookingById = async (req, res) => {
  const { id: booking_id } = req.params;

  try {
    const row = await bookingRepoDb.getBookingById(booking_id);
    if (!row) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json(row);
  } catch (err) {
    console.error(err); 
    return res.status(500).json({ error: 'Failed to fetch booking' });
  }
};

exports.deleteBooking = async (req, res) => {
  const { id: booking_id } = req.params;

  try {
    const isData = await bookingRepoDb.deleteBooking(booking_id);
    if (isData === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to delete booking' });
  }
};
