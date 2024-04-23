import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type User {
    id: ID!
    name: String!
    imgSrc: String
    chatIds: [String!]!
  }

  type Chat {
    id: ID!
    creator: User!
    participants: [User!]!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    userById(id: ID!): User
    users: [User]
  }
`;

const definedBooks = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

  const definedUser_1 = {
    id: 'user_vivian',
    name: 'Vivian',
    imgSrc: "",
    chatIds: ["chat_1001", "chat_1002", "chat_1004"]
  }

  const definedUser_2 = {
    id: 'user_raina',
    name: 'Raina',
    imgSrc: "",
    chatIds: ["chat_1001", "chat_1003"]
  }

  const definedUser_3 = {
    id: 'user_ray',
    name: 'Ray',
    imgSrc: "",
    chatIds: ["chat_1002", "chat_1003"]
  }

  const definedUser_4 = {
    id: 'user_mark',
    name: 'Mark',
    imgSrc: "",
    chatIds: ["chat_1004"]
  }

  const defined_users = [definedUser_1, definedUser_2, definedUser_3, definedUser_4];

  const resolvers = {
    Query: {
      books: () => definedBooks,
      userById: (_, {id}) => {
        return defined_users.find(user => user.id === id)
      },
      users: () => defined_users
    },
  };


  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);