import { objectType } from 'nexus'
import { Context } from '../../context'
import { getUserId } from '../../utils'

export const Room = objectType({
  name: 'Room',
  definition(t) {
    t.nonNull.int('id')
    t.field('UnReadMessageCount', {
      type: 'Int',
      resolve: async (root, _args, ctx: Context) => {
        try {
          const userId = getUserId(ctx)
          if (!userId) return 0
          return ctx.prisma.message.count({
            where: {
              read: false,
              roomId: root.id,
              user: {
                id: {
                  not: userId,
                },
              },
            },
          })
        } catch (error) {
          return error
        }
      },
    })
    t.list.field('user', {
      type: 'User',
      resolve: async (root, _args, ctx: Context) => {
        try {
          return ctx.prisma.room.findUnique({ where: { id: root.id } }).user()
        } catch (error) {
          return error
        }
      },
    })
    t.list.field('Message', {
      type: 'Message',
      resolve: async (root, _args, ctx: Context) => {
        try {
          return ctx.prisma.message.findMany({
            where: {
              roomId: root.id,
            },
          })
        } catch (error) {
          return error
        }
      },
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  },
})
