import { intArg, nonNull } from 'nexus'
import { ObjectDefinitionBlock } from 'nexus/dist/blocks'
import { Context } from '../../../context'
import { getUserId } from '../../../utils'

export const FeedsQuery = (t: ObjectDefinitionBlock<'Query'>) => {
  t.list.field('Feeds', {
    type: 'Photo',
    args: {
      cursor: nonNull(intArg()),
    },
    description: '',
    resolve: async (_, { cursor }, ctx: Context) => {
      try {
        // NOTE if i am following someone that means i am their followers list
        // so if i want to get feeds from all the users i am following so i have to fetch the users who have me in there followers list
        const userId = getUserId(ctx)
        return ctx.prisma.photo.findMany({
          where: {
            user: {
              followedBy: {
                some: {
                  id: userId,
                },
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 5,
          skip: cursor ? 1 : 0,
          cursor: cursor ? { id: cursor } : undefined,
        })
      } catch (error) {
        return error
      }
    },
  })
}
