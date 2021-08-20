import { arg, nonNull } from 'nexus'
import { ObjectDefinitionBlock } from 'nexus/dist/blocks'
import { Context } from '../../../context'
import { GetFollowingUserInput, GetFollowUserInput } from '../../ObjectTypes'

export const FollowUserQueries = (t: ObjectDefinitionBlock<'Query'>) => {
  t.field('GetFollowersQuery', {
    type: 'GetFollowersPayload',
    args: {
      data: nonNull(
        arg({
          type: GetFollowUserInput,
        }),
      ),
    },
    resolve: async (_, { data: { id, page } }, ctx: Context) => {
      try {
        const Followers = await ctx.prisma.user
          .findFirst({ where: { id } })
          .followedBy({
            take: 5,
            skip: (page - 1) * 5,
          })
        if (!Followers) return new Error(`User Not Found`)

        const count = await ctx.prisma.user.count({
          where: {
            following: {
              some: {
                id,
              },
            },
          },
        })
        return {
          user: Followers,
          TotalPages: Math.ceil(count / 5),
        }
      } catch (error) {
        return error
      }
    },
  })
  t.field('GetFollowingQuery', {
    type: 'GetFollowingPayload',
    args: {
      data: nonNull(
        arg({
          type: GetFollowingUserInput,
        }),
      ),
    },
    description: 'Get The Users Who Are Following Current User',
    resolve: async (_, { data: { id, cursor } }, ctx: Context) => {
      try {
        const Following = await ctx.prisma.user
          .findUnique({
            where: { id },
          })
          .following({
            take: 5,
            skip: cursor ? 1 : 0,
            cursor: cursor ? { id: cursor } : undefined,
          })

        if (!Following) return new Error(`User Not Found`)
        return {
          cursor,
          user: Following,
        }
      } catch (error) {
        return error
      }
    },
  })
}
