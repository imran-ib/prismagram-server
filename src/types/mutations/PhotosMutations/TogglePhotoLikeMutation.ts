import { intArg, nonNull } from 'nexus'
import { ObjectDefinitionBlock } from 'nexus/dist/blocks'
import { Context } from '../../../context'
import { getUserId } from '../../../utils'

export const TogglePhotoLikeMutation = (
  t: ObjectDefinitionBlock<'Mutation'>,
) => {
  t.field('TogglePhotoLike', {
    type: 'Like',
    args: {
      photoId: nonNull(intArg()),
    },
    description: '',
    resolve: async (_, { photoId }, ctx: Context) => {
      try {
        const userId = getUserId(ctx)
        if (!userId) return new Error(`Please Login`)
        const Photo = await ctx.prisma.photo.findUnique({
          where: { id: photoId },
        })
        if (!Photo) return new Error(`Photo Not Found`)
        const like = await ctx.prisma.like.findUnique({
          where: {
            userId_photoId: {
              photoId,
              userId,
            },
          },
        })
        if (like) {
          return await ctx.prisma.like.delete({
            where: {
              userId_photoId: {
                photoId,
                userId,
              },
            },
          })
        } else {
          return await ctx.prisma.like.create({
            data: {
              user: { connect: { id: userId } },
              photo: { connect: { id: photoId } },
            },
          })
        }
      } catch (error) {
        return error
      }
    },
  })
}
