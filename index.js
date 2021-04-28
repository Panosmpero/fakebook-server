const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
const { MONGO_URI } = require("./config");
const Post = require("./models/Post");
const User = require("./models/User");

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// mongoose.connect(
//   MONGO_URI,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (err, client) => {
//     if (err) return console.log("MongoDB error");
//     console.log("MongoDB connected");
//   }
// );

// server
//   .listen({ port: PORT })
//   .then((res) => console.log(`Server running on port ${res.url}`));

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running on port ${res.url}`);
  });
