import { intArg, nonNull, nullable } from 'nexus'
import { ObjectDefinitionBlock } from 'nexus/dist/blocks'
import { Context } from '../../../context'

export const GetPhotoComments = (t: ObjectDefinitionBlock<'Query'>) => {
  t.list.field('GetPhotoComments', {
    type: 'Comment',
    args: {
      photoId: nonNull(intArg()),
      cursor: nullable(intArg()),
    },
    resolve: async (_, { photoId, cursor }, ctx: Context) => {
      try {
        const photo = await ctx.prisma.photo.findUnique({
          where: { id: photoId },
        })
        if (!photo) return new Error(`Photo Not Found`)
        return ctx.prisma.comment.findMany({
          where: {
            photoId,
          },
          take: 5,
          skip: cursor ? 1 : 0,
          cursor: cursor ? { id: cursor } : undefined,
          orderBy: {
            createdAt: 'desc',
          },
        })
      } catch (error) {
        return error
      }
    },
  })
}
