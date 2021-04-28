const postsResovlers = require("./posts");
const usersResolvers = require("./users");

module.exports = {
  Query: {
    ...postsResovlers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation
  }
}