import { nonNull, intArg } from 'nexus'
import { ObjectDefinitionBlock } from 'nexus/dist/blocks'
import { Context } from '../../../context'

export const GetPhotoQuery = (t: ObjectDefinitionBlock<'Query'>) => {
  t.field('GetPhoto', {
    type: 'Photo',
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_, { id }, ctx: Context) => {
      try {
        return ctx.prisma.photo.findUnique({
          where: { id },
          include: {
            user: { select: { id: true, username: true } },
            hashtag: {
              select: {
                id: true,
                hashtag: true,
              },
            },
          },
        })
      } catch (error) {
        return error
      }
    },
  })
}
