const express = require("express");
const router = express.Router();

// add the controllers
const { HotelsCtrl } = require("../controllers/hotels.ctrl");
const { getHotels, createHotel, updateHotel } = HotelsCtrl;

// routes
router.route("/").get(getHotels);
router.route("/").post(createHotel);
router.route("/:id").patch(updateHotel);
router.route("/:id").delete();

module.exports = router;
