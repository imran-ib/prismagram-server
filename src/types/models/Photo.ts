import { objectType } from 'nexus'
import { Context } from '../../context'
import { getUserId } from '../../utils'

export const Photo = objectType({
  name: 'Photo',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.int('userId')
    t.nullable.string('file')
    t.nullable.string('caption')
    t.nonNull.field('user', { type: 'User' })
    t.list.field('Comment', { type: 'Comment' })
    t.list.field('hashtag', { type: 'HashTag' })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.field('LikeCount', {
      type: 'Int',
      resolve: async (root, _args, ctx: Context) => {
        return ctx.prisma.like.count({
          where: {
            photoId: root.id,
          },
        })
      },
    })
    t.field('CommentCount', {
      type: 'Int',
      resolve: async (root, _args, ctx: Context) => {
        return ctx.prisma.comment.count({
          where: {
            photoId: root.id,
          },
        })
      },
    })
    t.field('LikedByMe', {
      type: 'Boolean',
      resolve: async (root, _args, ctx: Context) => {
        const userId = getUserId(ctx)
        if (!userId) return false
        const IsLiked = await ctx.prisma.like.findUnique({
          where: {
            userId_photoId: {
              photoId: root.id,
              userId,
            },
          },
        })
        return Boolean(IsLiked)
      },
    })
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
