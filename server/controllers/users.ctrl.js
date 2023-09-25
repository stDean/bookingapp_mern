const { BadRequestError } = require("../errors");
const User = require("../models/Users.model");
const { StatusCodes } = require("http-status-codes");

const UsersCtrl = {
  getUsers: async (req, res) => {
    const users = await User.find({});
    res.status(StatusCodes.OK).json(users);
  },
  getUser: async (req, res) => {
    const {
      params: { id: userId },
    } = req;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new BadRequestError(`No user with id: ${userId} found`);
    }

    res.status(StatusCodes.OK).json(user);
  },
  updateUser: async (req, res) => {
    const {
      params: { id: userId },
    } = req;

    const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      throw new BadRequestError(`No user with id: ${userId} found`);
    }

    res.status(StatusCodes.OK).json(user);
  },
  deleteUser: async (req, res) => {
    const {
      params: { id: userId },
    } = req;

    const user = await User.findOneAndDelete({ _id: userId });
    if (!user) {
      throw new BadRequestError(`No user with id: ${userId} found`);
    }

    res.status(StatusCodes.OK).json({ msg: "deleted successfully" });
  },
};

module.exports = { UsersCtrl };
