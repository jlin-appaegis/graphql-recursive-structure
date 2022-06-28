const { ApolloServer, gql } = require("apollo-server");

const users = [
  {
    id: "1",
    name: "Jack",
    friends: [],
  },
  {
    id: "2",
    name: "Peter",
    friends: ["1", "3"],
  },
  {
    id: "3",
    name: "Mary",
    friends: ["2"],
  },
];
const friendship = {
  1: [],
  2: ["1", "3"],
  3: ["2"],
};

// Schema definition
const typeDefs = gql`
  type User {
    id: ID!
    name: String
    friends: [User]!
  }

  type Query {
    user(id: ID!): User
  }
`;

// Resolver map
const resolvers = {
  Query: {
    user(parent, args, context, info) {
      const { id: targetId } = args;
      const user = users.find(({ id }) => id === targetId);
      if (!user) {
        throw new Error("user not found");
      }
      return user;
    },
  },
  User: {
    friends(parent) {
      const friendIds = friendship[parent.id] || [];
      return friendIds
        .map((friendId) => users.find(({ id }) => id === friendId))
        .filter((user) => !!user);
    },
  },
};

// Pass schema definition and resolvers to the
// ApolloServer constructor
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Launch the server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
