import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { PubSub } from 'apollo-server'

export const prisma = new PrismaClient({
  errorFormat: 'pretty',
})
const pubsub = new PubSub()
export interface Context {
  prisma: PrismaClient
  pubsub: PubSub
  req: Request
  res: Response
}

export function createContext(req: Context) {
  return {
    ...req,
    prisma,
    pubsub,
  }
}
