import { objectType, intArg } from 'nexus'
import { Context } from '../../context'
import { getUserId } from '../../utils'

export const HashTag = objectType({
  name: 'HashTag',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('hashtag')
    t.list.field('Photos', {
      type: 'Photo',
      args: { take: intArg(), cursor: intArg() },
      //@ts-ignore
      resolve(root, { take, cursor }, ctx: Context) {
        //Way -> 1 You can resolve the photo with pagination here
        //Way -> 2 in hashtag query you can get nested arguments in 'info' argument and resolve there
        const userId = getUserId(ctx)
        // user has to be logged in. doesn't have to by particular user. any user who is logged in can view photos of hashtag
        if (!userId) return
        return ctx.prisma.photo.findMany({
          where: {
            hashtag: {
              some: { hashtag: root.hashtag },
            },
          },
          take: 5,
          skip: cursor ? 1 : 0,
          cursor: cursor ? { id: cursor } : undefined,
        })
      },
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })

    t.field('PhotoCount', {
      type: 'Int',
      resolve: (root, _, ctx: Context) => {
        const userId = getUserId(ctx)
        return ctx.prisma.photo.count({
          where: {
            hashtag: {
              some: {
                hashtag: root.hashtag,
              },
            },
          },
        })
      },
    })
  },
})
