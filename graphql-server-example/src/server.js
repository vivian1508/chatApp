import express from "express";
import cors from "cors";
import comments from "../routes/comments.js";

import gql from "graphql-tag";
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4';
import resolvers from "./resolvers.js";
import { readFileSync } from "fs";
// set up subscription
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

const PORT = process.env.PORT || 5050;

const typeDefs = gql(
  readFileSync("schema.graphql", {
    encoding: "utf-8",
  })
);
const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
// app.use(cors());
// app.use(express.json());

// This `app` is the returned value from `express()`.
const httpServer = createServer(app);


// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/subscriptions',
});
// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});
// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await server.start();

app.use("/comments", comments);
app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server),
);

// // start the Express server
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

// Now that our HTTP server is fully set up, we can listen to it.
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});