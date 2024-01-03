const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// Protect routes for user
const protectUser = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the 'Authorization' header is present
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the 'Authorization' header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user information to the request
      const user = await User.findById(decoded.userId).select("-password");

      if (!user || user.isAdmin !== false) {
        res.status(401);
        throw new Error("Not authorized, invalid user token");
      }

      // For regular users, attach user information to the request
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Protect routes for admin
const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the 'Authorization' header is present
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the 'Authorization' header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user information to the request
      const user = await User.findById(decoded.userId).select("-password");

      if (!user || user.isAdmin !== true) {
        res.status(401);
        throw new Error("Not authorized, invalid admin token");
      }

      // For admin users, attach user information to the request
      req.admin = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protectUser, protectAdmin };
