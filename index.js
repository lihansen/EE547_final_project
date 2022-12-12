const fs = require('fs');
const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const http = require('http')

// import { makeExecutableSchema } from 'graphql-tools'
// import { GraphQLUpload } from 'graphql-upload'

const { ApolloServer, gql } = require('apollo-server-express');
const {graphqlSchema} = require('./schema')

const app = express()
const server_port = 3000
let config_json = {
  host: "localhost",
  port: "27017",
  db: "ee547_hw",
  opts: {
    useUnifiedTopology: true
  }
}

const mongo_url = 'mongodb://' + config_json.host + ':' + config_json.port;

const connection = mongoose.connect(mongo_url, {
  autoIndex: true
});

const server = new ApolloServer({ schema: graphqlSchema })
server.start().then(res => {
  server.applyMiddleware({ app });
  const httpServer = http.createServer(app);
  httpServer.listen({ port: 3000 }, () => {
    console.log('GraphQL API server running at http://localhost:3000/graphql ');

  })
});



