const express = require("express");
const router = express.Router();

// add the controllers
const { HotelsCtrl } = require("../controllers/hotels.ctrl");
const { getHotels, getHotel, createHotel, updateHotel, deleteHotel } = HotelsCtrl;

// routes
router.route("/").get(getHotels).post(createHotel);
router.route("/:id").get(getHotel).patch(updateHotel).delete(deleteHotel);

module.exports = router;
