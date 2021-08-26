import { intArg, nonNull } from 'nexus'
import { ObjectDefinitionBlock } from 'nexus/dist/blocks'
import { Context } from '../../../context'
import { getUserId } from '../../../utils'
import { User } from '../../models/User'

export const MessagesQueries = (t: ObjectDefinitionBlock<'Query'>) => {
  t.list.field('GetRooms', {
    type: 'Room',
    description: 'Get Chat Rooms For the Logged in User',
    resolve: (_, __, ctx: Context) => {
      try {
        const id = getUserId(ctx)
        if (!id) return
        return ctx.prisma.room.findMany({
          where: {
            user: {
              some: {
                id,
              },
            },
          },
        })
      } catch (error) {
        return error
      }
    },
  })
  t.field('GetRoom', {
    type: 'Room',
    args: {
      roomId: nonNull(intArg()),
    },
    resolve: async (_, { roomId }, ctx: Context) => {
      try {
        const userId = getUserId(ctx)
        return ctx.prisma.room.findFirst({
          where: { id: roomId, user: { some: { id: userId } } },
        })
      } catch (error) {
        return error
      }
    },
  })
}
