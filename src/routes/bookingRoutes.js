const express = require('express');
const bookingController = require('../controller/bookingController');
const router = express.Router();

router.post('/bookings', bookingController.createBooking);
router.get('/bookings', bookingController.getBookings);
router.get('/bookings/:booking_id', bookingController.getBookingById);
router.delete('/bookings/:booking_id', bookingController.deleteBooking);

module.exports = router;
