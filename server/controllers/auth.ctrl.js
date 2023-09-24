const { StatusCodes } = require("http-status-codes");

const AuthCtrl = {
  login: async (req, res) => {
    res.status(StatusCodes.OK).json({ success: true, msg: "Logged In" });
  },
};

module.exports = { AuthCtrl };
