const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
const { typeDefs, resolvers } = require("./schema/schema");
// const session = require("express-session");
// const passport = require("passport");
// const {
//   GraphQLLocalStrategy,
// //   buildContext,
//   createOnConnect,
// } = require("graphql-passport");
// const MongoDbStore = require("connect-mongodb-session")(session);

// 7sPH6ssTWMtqnh7C connection password
const MONGOURI =
  "mongodb+srv://Anushil:485jeIKR1QGlyp2S@clusternode-rzps1.mongodb.net/NewDb?retryWrites=true&w=majority";

// const store = new MongoDbStore({
//   uri: MONGOURI,
//   collection: "sessions",
// });
//import models
const User = require("./models/user");

const app = express();
// passport.use(
//   new GraphQLLocalStrategy(async (username, password, done) => {
//     const user = await User.findOne({
//       username: username,
//       password: password,
//     });
//     if (!user) {
//       done(new Error("no matching user"), user);
//     } else {
//       done(null, user);
//     }
//   })
// );
// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });
// const sessionMiddleware = session({
//   secret: "kredent-secret-node-project",
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false },
//   store: store,
// }); 
// const passportMiddleware = passport.initialize();
// const passportSessionMiddleware = passport.session();
// app.use(sessionMiddleware);
// app.use(passportMiddleware);
// app.use(passportSessionMiddleware);

const server = new ApolloServer({
  typeDefs,
  resolvers,
//   context: ({ req, res }) => buildContext({ req, res, User }),
//   subscriptions: {
//     onConnect: createOnConnect([
//       sessionMiddleware,
//       passportMiddleware,
//       passportSessionMiddleware,
//     ]),
//   },
  playground: true,
  introspection: true,
});

server.applyMiddleware({ app});

app.listen({ port: 4000 }, () => {
  mongoose
    .connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Connected to database"));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
