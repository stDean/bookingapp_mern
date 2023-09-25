const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const AuthMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    throw new UnauthenticatedError("Invalid Authorization");
  }

  try {
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid Authentication.");
  }
};

const VerifyUser = async (req, res, next) => {
  if (!(req.user.userId === req.params.id || req.user.isAdmin)) {
    throw new UnauthenticatedError(
      "You are not allowed to perform this action."
    );
  }
  next();
};

const VerifyAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) {
    throw new UnauthenticatedError("Admin resources access denied.");
  }
  next();
};

module.exports = { AuthMiddleware, VerifyUser, VerifyAdmin };
