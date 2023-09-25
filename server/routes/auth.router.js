const express = require("express");
const router = express.Router();

// add the controllers
const { AuthCtrl } = require("../controllers/auth.ctrl");
const { login, register } = AuthCtrl;

// routes
router.route("/login").post(login);
router.route("/register").post(register);

module.exports = router;
