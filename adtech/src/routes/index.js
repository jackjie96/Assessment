const express = require("express");
const router = express.Router();
const customerRoutes = require("./customerRoutes");
const streamTypeRoutes = require("./streamTypeRoutes");
const campaignBookingRoutes = require("./campaignBookingRoutes");

router.use("/customers", customerRoutes);
router.use("/stream-types", streamTypeRoutes);
router.use("/campaign-bookings", campaignBookingRoutes);

module.exports = router;
