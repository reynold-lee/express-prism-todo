import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import {
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core'
import fs from 'fs'
import https from 'https'
import http from 'http'

import { schema } from './schema'
import { context } from './context'

async function startApolloServer() {
  const config = { ssl: false, port: 5000, hostname: 'localhost' };

  const server = new ApolloServer({
    schema,
    context,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  })
  await server.start()
  const app = express();
  server.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000"
    },
  })
  const httpServer = http.createServer(app);

  await new Promise<void>(resolve =>
    httpServer.listen({ port: config.port }, resolve)
  );

  console.log(
    '🚀 Server ready at',
    `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}`
  );

  return { server, app };
}

startApolloServer()