const express = require("express");
const router = express.Router();

// add the controllers
const { AuthCtrl } = require("../controllers/auth.ctrl");
const { login } = AuthCtrl;

// routes
router.route("/").get(login);

module.exports = router;
