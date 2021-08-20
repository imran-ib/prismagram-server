import { intArg, nonNull, stringArg } from 'nexus'
import { ObjectDefinitionBlock } from 'nexus/dist/blocks'
import { Context } from '../../../context'
import { GetHashtags } from '../../../utils'

export const UpdatePhotoMutation = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('UpdatePhoto', {
    type: 'Photo',
    args: {
      id: nonNull(intArg()),
      caption: stringArg(),
    },
    description: "Update photo's caption and update hashtags",
    resolve: async (_, { id, caption = '' }, ctx: Context) => {
      try {
        let hashtags
        //@ts-ignore
        hashtags = GetHashtags(caption) || []

        const Photo = await ctx.prisma.photo.findUnique({
          where: {
            id,
          },
          include: {
            hashtag: {
              select: {
                hashtag: true,
              },
            },
          },
        })
        if (!Photo) return new Error(`Post Not Found`)
        const UpdatedPhoto = await ctx.prisma.photo.update({
          where: { id },
          data: {
            caption,
            // @ts-ignore
            hashtag: {
              disconnect: Photo.hashtag,
              ...(hashtags!.length > 0 && {
                connectOrCreate: hashtags!.map((tag: String) => ({
                  where: { hashtag: tag },
                  create: { hashtag: tag },
                })),
              }),
            },
          },
        })

        return UpdatedPhoto
      } catch (error) {
        return error
      }
    },
  })
}
