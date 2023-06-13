const db = require("./config/connections.js");
const { typeDefs, resolvers } = require("./schemas");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
require("dotenv").config();
const morgan = require("morgan");

const PORT = process.env.PORT || 3001;
const app = express();
// this is the middleware that will allow us to parse the incoming string or array data
app.use(morgan("short"));

const server = new ApolloServer({
  typeDefs,
  resolvers,

  context: authMiddleware,
});

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// })
// } else {
//   app.use(express.static(path.join(__dirname, "../client/public")));
//   app.get("/", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client/public", "index.html"));
//   });
// }

// // Create a new instance of an Apollo server with the GraphQL schema
// const startApolloServer = async () => {
//   await server.start();
//   server.applyMiddleware({ app });

//   db.once("open", () => {
//     app.listen(PORT, () => {
//       console.log(`API server running on port ${PORT}!`);
//       console.log(
//         `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
//       );
//     });
//   });
// };

// // Call the async function to start the server
// startApolloServer();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer();
