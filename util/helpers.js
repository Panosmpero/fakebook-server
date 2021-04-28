const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const getToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
};

module.exports = {
  getToken,
};
