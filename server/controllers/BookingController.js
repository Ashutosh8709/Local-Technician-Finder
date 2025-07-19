const Booking = require('../models/booking');
const Technician=require('../models/technician');

const createBooking = async (req, res) => {
  try {
    const { userId, technicianId, slot } = req.body;

    const slotISO = new Date(slot).toISOString(); // <== likely the source of the error

    const existing = await Booking.findOne({ technicianId, slot: slotISO });
    if (existing) {
      return res.status(409).json({ message: 'Slot Already Booked', success: false });
    }

    const booking = new Booking({ userId, technicianId, slot: slotISO });
    await booking.save();

    await Technician.findByIdAndUpdate(technicianId, {
      $pull: { availableSlots: slotISO }
    });

    res.status(201).json({ message: 'Booking Created', success: true });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};


module.exports={createBooking};