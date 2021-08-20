import { arg, nonNull } from 'nexus'
import { ObjectDefinitionBlock } from 'nexus/dist/blocks'
import { Context } from '../../../context'
import { GetHashtags, getUserId } from '../../../utils'
import { UploadPhotoInput } from '../../ObjectTypes'

export const UploadPhotoMutations = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('UploadPhoto', {
    type: 'Photo',
    args: {
      data: nonNull(
        arg({
          type: UploadPhotoInput,
        }),
      ),
    },
    resolve: async (_, { data: { photo, caption } }, ctx: Context) => {
      let hashtags: [] | any
      try {
        const UserId = getUserId(ctx)

        if (caption) {
          hashtags = GetHashtags(caption)
        }
        const PHOTO = await ctx.prisma.photo.create({
          data: {
            file: photo,
            caption,
            ...(hashtags.length > 0 && {
              hashtag: {
                connectOrCreate: hashtags.map((tag: String) => ({
                  where: { hashtag: tag },
                  create: { hashtag: tag },
                })),
              },
            }),
            user: { connect: { id: UserId } },
          },
        })
        return PHOTO
      } catch (error) {
        console.log(error)
        return error
      }
    },
  })
}
