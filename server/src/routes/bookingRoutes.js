import express from 'express';
import { createBooking, getMyBookings, getOwnerBookings } from '../controllers/bookingController.js';
import { protect, ownerOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createBooking);
router.route('/mybookings').get(protect, getMyBookings);
router.route('/ownerbookings').get(protect, ownerOnly, getOwnerBookings);

export default router;
