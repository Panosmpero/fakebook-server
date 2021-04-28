const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");

const PORT = process.env.PORT || 5000;

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello from GraphQL!",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen({ port: PORT })
  .then((res) => console.log(`Server running on port ${res.url}`));
