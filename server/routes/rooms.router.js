const express = require("express");
const router = express.Router();

// add the controllers
const RoomsCtrl = require("../controllers/rooms.ctrl");
const {} = RoomsCtrl;

// routes
router.route("/").get((req, res) => {
  res.json({ msg: "Rooms" });
});

module.exports = router;
