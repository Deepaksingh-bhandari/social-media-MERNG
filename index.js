const express =require('express')
const {createServer} = require('http');

const { makeExecutableSchema }= require('@graphql-tools/schema');
const {execute,subscribe} =require('graphql')
const {SubscriptionServer} = require('subscriptions-transport-ws')

const { ApolloServer} = require('apollo-server-express');

// const {PubSub} = require('graphql-subscriptions');

const mongoose = require('mongoose')
const { MONGODB } = require('./config.js')

const typeDefs = require('./graphql/typeDef')
// Resolvers resolves the queryt & returns output
const resolvers = require('./graphql/resolvers/index');

// const pubsub = new PubSub();

(async function(){
const app=express()
const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });


// Creates instance of Apollo server which takes Typedefs & resolvers
// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: ({ req }) => ({ req, pubsub })    //takes the request body & forward it to the context
// })
const subscriptionServer=SubscriptionServer.create(
    {schema,  execute, subscribe},
    {server:httpServer}
)
// const wsServer = new WebSocketServer({
//     // This is the `httpServer` we created in a previous step.
//     server: server,
//     // Pass a different path here if your ApolloServer serves at
//     // a different path.
//     path: '/graphql',
//   });
  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
//   const serverCleanup = useServer({ schema }, wsServer);

//   Creating Apollo-server instance
  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }) ,   //takes the request body & forward it to the context
    plugins: [
      // Proper shutdown for the HTTP server.
    //   ApolloServerPluginDrainHttpServer({ httpServer }),
  
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
               subscriptionServer.close();
            },
          };
        },
      },
    ]
  });


await server.start();

server.applyMiddleware({app})

const PORT=8000;
mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
    console.log("Connected to mongo server.");
    return httpServer.listen(PORT,()=>{console.log(`server is listening on port : ${PORT}`)})
})
   
})();


