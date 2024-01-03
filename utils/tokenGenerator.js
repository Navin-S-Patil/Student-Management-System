const jwt = require("jsonwebtoken");




const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set the token in the response header
  res.header('Authorization', `Bearer ${token}`);
  res.status(200).json({ token });
};

module.exports = generateToken;
