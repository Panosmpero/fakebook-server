const postsResovlers = require("./posts");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");

module.exports = {
  Query: {
    ...postsResovlers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResovlers.Mutation,
    ...commentsResolvers.Mutation
  }
}