import { GraphQLServer, PubSub } from 'graphql-yoga';
// GraphQLServer allows us to create a graphql server using the yoga library.
import db from './db';
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import Post from './resolvers/Post';
import User from './resolvers/User';
import Comment from './resolvers/Comment';
import { resolvers, fragmentReplacements } from './resolvers/index';

import { prisma } from './prisma'
// importing here to add to application context

const pubsub = new PubSub();


const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers, // adds imported resolvers to our application
  context(request) {
    return {
      db, // setting database to context.
      pubsub,  // making pubsub instance accessible to resolvers
      prisma, // makes prisma available to application context.
      request, // allows us to access our custom headers from resolvers
    }
  },
  fragmentReplacements, // exposes fragments to application, same as context, resolvers & typeDefs
});

server.start({ port: 4001 }, () => {
  console.log('served up: http://localhost:4001')
});
