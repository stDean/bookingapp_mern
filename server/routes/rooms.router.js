const express = require("express");
const router = express.Router();

// add the controllers
const { RoomsCtrl } = require("../controllers/rooms.ctrl");
const { getRooms, getRoom, createRoom, updateRoom, deleteRoom } = RoomsCtrl;
const {
  VerifyAdmin,
  AuthMiddleware,
} = require("../middleware/auth.middleware");

// routes
router.route("/").get(getRooms);
router.route("/:hotelId").post(AuthMiddleware, VerifyAdmin, createRoom);
router
  .route("/:id")
  .get(getRoom)
  .patch(AuthMiddleware, VerifyAdmin, updateRoom);
router.route("/:id/:hotelId").delete(AuthMiddleware, VerifyAdmin, deleteRoom);

module.exports = router;
