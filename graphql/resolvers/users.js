const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 12;
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");

module.exports = {
  Mutation: {
    login: async (parent, args, context, info) => {
      const {
        loginInput: { username, password },
      } = args;

      // Validate user data
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) throw new UserInputError("Errors", { errors });

      // find user
      const user = await User.findOne({ username });
      if (!user) {
        errors.login = "Wrong login details";
        throw new UserInputError("Wrong login details", { errors });
      }

      // confirm password
      const confirm = await bcrypt.compare(password, user.password);
      if (!confirm) {
        errors.login = "Wrong login details";
        throw new UserInputError("Wrong login details", { errors });
      }

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
        token,
      };
    },
    register: async (parent, args, context, info) => {
      const {
        registerInput: { username, email, password, confirmPassword },
      } = args;

      // Validate user data
      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) throw new UserInputError("Errors", { errors });

      // check if username already exists
      const checkUser = await User.findOne({ username });
      if (checkUser)
        throw new UserInputError("This username is taken", {
          errors: {
            username: "This username is taken",
          },
        });

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
        token,
      };
    },
  },
};
