const Booking = require('../../models/Booking');
const Package = require('../../models/Package');
const User = require('../../models/User');

async function getOverview(req, res) {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalPackages = await Package.countDocuments();
    const totalUsers = await User.countDocuments();
    const revenueAgg = await Booking.aggregate([
      { $match: { status: 'accepted' } },
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);
    const totalRevenue = (revenueAgg[0] && revenueAgg[0].total) || 0;
    const recentBookings = await Booking.find().sort({ bookedAt: -1 }).limit(10);
    return res.json({ totalBookings, totalPackages, totalUsers, totalRevenue, recentBookings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { getOverview };
