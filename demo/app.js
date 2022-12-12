const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const DataLoader = require('dataloader');

const { readFileSync } = require('fs')
const { assertResolversPresent, makeExecutableSchema } = require('@graphql-tools/schema');
const { Client: PgClient } = require('pg');

const app = express();

(async function () {
  const connection = new PgClient({
    host: process.env.PGHOST || '127.0.0.1',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  });

  await connection.connect();

  const typeDefs = readFileSync('./schema.graphql').toString('utf-8')
  const resolvers = require('./resolvers');

  const schema = makeExecutableSchema({
    resolvers,
    resolverValidationOptions: {
      requireResolversForAllFields:  'warn',
      requireResolversToMatchSchema: 'warn'
    },
    typeDefs
  });

  app.use('/graphql', graphqlHTTP(async (req) => {
    return {
      schema,
      graphiql: true,
      context: {
        db: connection,
        loaders: {
            user:    new DataLoader(keys => getUsers(connection, keys)),
            article: new DataLoader(keys => getArticles(connection, keys)),
        }
      }
    };
  }));

  app.listen(3000);
  console.log('GraphQL API server running at http://localhost:3000/graphql');
})()


// global scope
async function getUsers(db, keys) {
  // SHOULD PARAMETERIZE THE QUERY
  const { rows, fields } = await db.query('SELECT * FROM appuser WHERE user_id IN (' + keys.join(',') + ')');
  const results = rows.reduce((acc, row) => {
    acc[row.user_id] = row;
    return acc;
  }, {});
  return keys.map(key => results[key] || new Error(`user [${key}] does not exist `));
}

async function getArticles(db, keys) {
  // SHOULD PARAMETERIZE THE QUERY
  const { rows, fields } = await db.query('SELECT * FROM article WHERE article_id IN (' + keys.join(',') + ')');
  const results = rows.reduce((acc, row) => {
    acc[row.article_id] = row;
    return acc;
  }, {});
  return keys.map(key => results[key] || new Error(`article [${key}] does not exist `));
}




