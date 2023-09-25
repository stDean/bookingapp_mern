const { StatusCodes } = require("http-status-codes");
const User = require("../models/Users.model");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const AuthCtrl = {
  login: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new BadRequestError("All fields must be filled.");
    }

    const user = await User.findOne({ username });
    if (!user) {
      throw new UnauthenticatedError("No user with this username.");
    }

    const isCorrectPassword = await user.comparePassword(password);
    if (!isCorrectPassword) {
      throw new BadRequestError("Incorrect password entered.");
    }

    const token = user.createJWT();
    const { password: userPassword, isAdmin, ...restProps } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(StatusCodes.OK)
      .json({ msg: "Logged In", ...restProps });
  },
  register: async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res
      .status(StatusCodes.OK)
      .json({ msg: "User created successfully.", user, token });
  },
};

module.exports = { AuthCtrl };
