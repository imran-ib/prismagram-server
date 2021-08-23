import { intArg, nonNull, stringArg } from 'nexus'
import { ObjectDefinitionBlock } from 'nexus/dist/blocks'
import { Context } from '../../../context'
import { getUserId } from '../../../utils'

export const CommentsMutations = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('CreateComment', {
    type: 'Comment',
    args: {
      payload: nonNull(stringArg()),
      photoId: nonNull(intArg()),
    },
    description: 'Create New Comment For Photo',
    resolve: async (_, { payload, photoId }, ctx: Context) => {
      try {
        const userId = getUserId(ctx)
        const photo = await ctx.prisma.photo.findUnique({
          where: { id: photoId },
          select: { id: true },
        })
        if (!photo) return new Error(`Photo Not Found`)
        const Comment = await ctx.prisma.comment.create({
          data: {
            payload,
            user: {
              connect: { id: userId },
            },
            photo: {
              connect: { id: photoId },
            },
          },
        })
        if (!Comment) return new Error(`Something Went wrong. Please Try Again`)
        return Comment
      } catch (error) {
        return error
      }
    },
  })
  t.field('UpdateComment', {
    type: 'Comment',
    args: {
      payload: nonNull(stringArg()),
      commentId: nonNull(intArg()),
    },
    resolve: async (_, { payload, commentId }, ctx: Context) => {
      try {
        const userId = getUserId(ctx)
        const comment = await ctx.prisma.comment.findFirst({
          where: { id: commentId, userId },
          select: { id: true },
        })
        if (!comment) return new Error(`Comment Not found`)
        const updatedComment = await ctx.prisma.comment.update({
          data: { payload },
          where: {
            id: commentId,
          },
        })
        if (!updatedComment)
          return new Error(`Something Went wrong. Please Try Again`)
        return updatedComment
      } catch (error) {
        return error
      }
    },
  })
  t.field('DeleteComment', {
    type: 'Boolean',
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_, { id }, ctx: Context) => {
      try {
        const userId = getUserId(ctx)
        const comment = await ctx.prisma.comment.findFirst({
          where: {
            id,
            userId,
          },
        })
        if (!comment) return new Error(`Comment Not Found`)
        await ctx.prisma.comment.delete({ where: { id } })
        return true
      } catch (error) {
        return error
      }
    },
  })
}
