const express = require("express");
const router = express.Router();

// add the controllers
const { HotelsCtrl } = require("../controllers/hotels.ctrl");
const { getHotels, getHotel, createHotel, updateHotel, deleteHotel } =
  HotelsCtrl;
const { VerifyAdmin, AuthMiddleware } = require("../middleware/auth.middleware");

// routes
router.route("/").get(getHotels).post(VerifyAdmin, createHotel);
router
  .route("/:id")
  .get(getHotel)
  .patch(AuthMiddleware, VerifyAdmin, updateHotel)
  .delete(AuthMiddleware, VerifyAdmin, deleteHotel);

module.exports = router;
