import { objectType } from 'nexus'
import { Context } from '../../context'

export const Message = objectType({
  name: 'Message',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('payload')
    t.nonNull.boolean('read')
    t.nonNull.field('Room', { type: 'Room' })
    t.field('user', {
      type: 'User',
      resolve: async (root, _args, ctx: Context) => {
        try {
          return ctx.prisma.message
            .findUnique({ where: { id: root.id } })
            .user()
        } catch (error) {
          return error
        }
      },
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  },
})
