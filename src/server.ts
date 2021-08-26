import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { createContext } from './context'
import { verify } from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface Token {
  userId: string
}

const PORT = process.env.PORT || 4000

const server = new ApolloServer({
  schema: schema,
  context: createContext,
  playground: true,
  cors: true,
  subscriptions: {
    onConnect: async (connectionParams: any) => {
      if (connectionParams.Authorization) {
        const token = connectionParams.Authorization.replace('Bearer ', '')

        if (!token) throw new Error(`Not Authorized`)
        const verifiedToken = verify(token, process.env.APP_SECRET!) as Token
        let userId
        if (verifiedToken) {
          userId = parseInt(verifiedToken.userId)
        }
        if (!userId) return

        const USER = await prisma.user.findUnique({
          where: { id: userId },
          select: { id: true },
        })
        
        return USER
      }
      throw new Error('Missing auth token!')
    },
    onDisconnect: () => {
      console.log('websocket disconnect')
    },
  },
})

server.listen({ port: PORT }).then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`)
  console.log(`⏰ Subscriptions ready at ${subscriptionsUrl}`)
  console.log(
    `⭐️ See sample queries: http://pris.ly/e/ts/graphql-subscriptions#using-the-graphql-api`,
  )
})

// =====For Local Uploads 🙃  ======

// require('dotenv').config()
// import express from 'express'
// import { ApolloServer } from 'apollo-server-express'
// import { schema } from './schema'
// import { createContext } from './context'
// import { graphqlUploadExpress } from 'graphql-upload'

// async function startServer() {
//   const server = new ApolloServer({
//     schema: schema,
//     context: createContext,
//   })

//   await server.start()
//   server.graphqlPath = '/server'

//   const app = express()

//   // This middleware should be added before calling `applyMiddleware`.
//   app.use(graphqlUploadExpress())
//   app.use('/static', express.static(__dirname + '/uploads'))
//   // NOTE http://localhost:4000/static/filename.png
//   server.applyMiddleware({ app })
//   //@ts-ignore
//   await new Promise((r) => app.listen({ port: 4000 }, r))

//   console.log(
//     `🚀 Server ready at ${process.env.BACKEND_URL}${server.graphqlPath}`,
//   )
// }

// startServer()
