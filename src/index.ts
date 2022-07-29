import { ApolloServer } from 'apollo-server'

import { schema } from './schema'
import { context } from './context'

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};

export const server = new ApolloServer({
    schema,
    context,
    cors: corsOptions
})

const port = 5000;

server.listen({ port }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})