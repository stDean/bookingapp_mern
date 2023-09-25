const express = require("express");
const router = express.Router();

// add the controllers
const { UsersCtrl } = require("../controllers/users.ctrl");
const { getUsers, getUser, updateUser, deleteUser } = UsersCtrl;
const {
  VerifyUser,
  VerifyAdmin,
  AuthMiddleware,
} = require("../middleware/auth.middleware");

// routes
router.route("/").get(AuthMiddleware, VerifyAdmin, getUsers);
router
  .route("/:id")
  .get(AuthMiddleware, VerifyUser, getUser)
  .patch(AuthMiddleware, VerifyUser, updateUser)
  .delete(AuthMiddleware, VerifyUser, deleteUser);

module.exports = router;
