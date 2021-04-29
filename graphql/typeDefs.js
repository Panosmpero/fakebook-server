const { gql } = require("apollo-server");
// const gql = require("graphql-tag");

module.exports = gql`
type Post {
  id: ID!
  body: String!
  username: String!
  createdAt: String!
  comments: [Comment]!
  likes: [Like]!
  likesCount: Int!
  commentsCount: Int!
}
input RegisterInput {
  username: String!
  password: String!
  confirmPassword: String!
  email: String!
}
input LoginInput {
  username: String!
  password: String!
}
type User {
  id: ID!
  username: String!
  email: String!
  token: String!
  createdAt: String!
}
type Comment {
  id: ID!
  username: String!
  body: String!
  createdAt: String!
}
type Like {
  id: ID!
  username: String!
  createdAt: String!
}

type Query {
  getPosts: [Post]
  getPost(postId: ID!): Post
}
type Mutation {
  register(registerInput: RegisterInput): User!
  login(loginInput: LoginInput): User!
  createPost(body: String!): Post!
  deletePost(postId: ID!): String!
  createComment(postId: ID!, body: String!): Post!
  deleteComment(postId: ID!, commentId: ID!): Post!
  likePost(postId: ID!): Post!
}
type Subscription {
  newPost: Post!
}
`;