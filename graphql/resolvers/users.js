const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 12;
const { JWT_SECRET } = require("../../config");

module.exports = {
  Mutation: {
    register: async (parent, args, context, info) => {
      const {
        registerInput: { username, email, password, confirmPassword },
      } = args;

      // Validate user data

      // check if username already exists

      // hash password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      });

      const user = await newUser.save();

      // create auth token
      const token = jwt.sign(
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

      return {
        ...user._doc,
        id: user._id,
        token
      }
    },
  },
};
// type User {
//   id: ID!
//   username: String!
//   email: String!
//   token: String!
//   createdAt: String!
// }
