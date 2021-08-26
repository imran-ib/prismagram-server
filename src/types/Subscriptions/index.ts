import { Message } from '@prisma/client'
import { withFilter } from 'apollo-server'
import { subscriptionField } from 'nexus'
import { Context, prisma } from '../../context'
import { NEW_MESSAGE } from '../Constants'

export const Subscription = subscriptionField('NewMessage', {
  type: 'Message',
  subscribe: withFilter(
    (_root, _args, ctx) => {
      return ctx.pubsub.asyncIterator(NEW_MESSAGE)
    },
    //@ts-ignore
    async (parent, _, ctx) => {
      const Message = parent
      const user = ctx.connection.context
      // user { id: 6 }
      // Update Users Last typed with each message
      // await ctx.prisma.user.update({
      //   where: { id: parent.SenderId },
      //   data: { lastTyped: new Date().toISOString() },
      // })
      await prisma.user.update({
        data: {
          lastSeen: new Date().toISOString(),
          lastTyped: new Date().toISOString(),
        },
        where: { id: user.id },
      })
      if (Message.userId === user.id) {
        return true
      } else {
        return false
      }
    },
  ),
  resolve(payload) {
    return payload
  },
})
