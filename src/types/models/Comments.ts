import { objectType } from 'nexus'
import { Context } from '../../context'
import { getUserId } from '../../utils'

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.int('userId')
    t.nonNull.string('payload')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.field('user', { type: 'User' })
    t.field('IsMine', {
      type: 'Boolean',
      resolve: async (root, _args, ctx: Context) => {
        const userId = getUserId(ctx)
        if (!userId) return false
        const PhotoUserId = root.userId
        return userId == PhotoUserId
      },
    })
  },
})
