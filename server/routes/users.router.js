const express = require("express");
const router = express.Router();

// add the controllers
const UsersCtrl = require("../controllers/users.ctrl");
const {} = UsersCtrl;

// routes
router.route("/").get((req, res) => {
  res.json({ msg: "users" });
});

module.exports = router;
