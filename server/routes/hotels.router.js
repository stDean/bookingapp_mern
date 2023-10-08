const express = require("express");
const router = express.Router();

// add the controllers
const { HotelsCtrl } = require("../controllers/hotels.ctrl");
const {
  getHotels,
  getHotel,
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelByCity,
  getHotelByType,
  getHotelRooms,
} = HotelsCtrl;
const {
  VerifyAdmin,
  AuthMiddleware,
} = require("../middleware/auth.middleware");

// routes
router.route("/").get(getHotels).post(AuthMiddleware, VerifyAdmin, createHotel);
router
  .route("/find/:id")
  .get(getHotel)
  .patch(AuthMiddleware, VerifyAdmin, updateHotel)
  .delete(AuthMiddleware, VerifyAdmin, deleteHotel);

router.route("/countByCity").get(getHotelByCity);
router.route("/countByType").get(getHotelByType);
router.route("/room/:hotelId").get(getHotelRooms);



module.exports = router;
