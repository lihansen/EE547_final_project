const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { readFileSync } = require('fs')
const { assertResolversPresent, makeExecutableSchema } = require('@graphql-tools/schema');
const app = express();



const typeDefs = readFileSync('./schema-v2.graphql').toString('utf-8')
const resolvers = {
  Mutation: {
    playerUpdate: ({ }, { pid, playerInput }, context) => {
      return { pid };
    }, playerDelete: ({ }, { pid }, context) => {
      return true;
    },
  }, Player: {
    lname: ({ pid }, { }, context) => {
      return null;
    },
  }, Query: {
    player: ({ }, { pid }, context) => {
      return { pid };
    },
  }

}

const schema = makeExecutableSchema({
  resolvers,
  typeDefs
});

app.use('/ping', graphqlHTTP(async (req) => {
  return {
    schema,
    // graphiql: true,
    context: {}
  };
}));

app.listen(3000);
  // console.log('GraphQL API server running at http://localhost:3000/graphql');
