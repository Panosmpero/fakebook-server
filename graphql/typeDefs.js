const { gql } = require("apollo-server");
// const gql = require("graphql-tag");

module.exports = gql`
type Post {
  id: ID!
  body: String!
  username: String!
  createdAt: String!
}
input RegisterInput {
  username: String!
  password: String!
  confirmPassword: String!
  email: String!
}
type User {
  id: ID!
  username: String!
  email: String!
  token: String!
  createdAt: String!
}

type Query {
  getPosts: [Post]
}
type Mutation {
  register(registerInput: RegisterInput): User!
}
`;