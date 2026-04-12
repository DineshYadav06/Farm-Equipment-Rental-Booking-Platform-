import Booking from '../models/Booking.js';
import Equipment from '../models/Equipment.js';
import { appendBookingToSheet } from '../services/googleSheetService.js';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  const { equipmentId, startDate, endDate, totalPrice } = req.body;

  const equipment = await Equipment.findById(equipmentId);

  if (!equipment) {
    return res.status(404).json({ message: 'Equipment not found' });
  }

  // Basic date conflict validation
  const conflictingBookings = await Booking.find({
    equipment: equipmentId,
    status: { $in: ['pending', 'confirmed'] },
    $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
  });

  if (conflictingBookings.length > 0) {
    return res.status(400).json({ message: 'Equipment is already booked for these dates' });
  }

  const booking = new Booking({
    user: req.user._id,
    owner: equipment.owner,
    equipment: equipmentId,
    startDate,
    endDate,
    totalPrice,
  });

  const createdBooking = await booking.save();

  // Sync to Google Sheets
  const bookingSyncData = {
    _id: createdBooking._id,
    user: { phone: req.user.phone || req.user.name },
    equipment: equipment.name,
    startDate,
    endDate,
    totalPrice,
    status: 'pending'
  };
  appendBookingToSheet(bookingSyncData).catch(err => console.error("Sheet sync failed:", err.message));

  res.status(201).json(createdBooking);
};

// @desc    Get user's bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('equipment', 'name type image');
  res.json(bookings);
};

// @desc    Get owner's bookings (bookings on their equipment)
// @route   GET /api/bookings/ownerbookings
// @access  Private/Owner
const getOwnerBookings = async (req, res) => {
  const bookings = await Booking.find({ owner: req.user._id }).populate('equipment', 'name type').populate('user', 'name phone');
  res.json(bookings);
};

export { createBooking, getMyBookings, getOwnerBookings };
