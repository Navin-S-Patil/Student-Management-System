const jwt = require("jsonwebtoken");

const getDecodedUser = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

module.exports = { getDecodedUser };
