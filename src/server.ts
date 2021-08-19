require('dotenv').config()
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { schema } from './schema'
import { createContext } from './context'
import { graphqlUploadExpress } from 'graphql-upload'

async function startServer() {
  const server = new ApolloServer({
    schema: schema,
    context: createContext,
  })

  await server.start()
  server.graphqlPath = '/server'

  const app = express()

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress())
  app.use('/static', express.static(__dirname + '/uploads'))
  // NOTE http://localhost:4000/static/filename.png
  server.applyMiddleware({ app })
  //@ts-ignore
  await new Promise((r) => app.listen({ port: 4000 }, r))

  console.log(
    `🚀 Server ready at ${process.env.BACKEND_URL}${server.graphqlPath}`,
  )
}

startServer()
