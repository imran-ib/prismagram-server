import { ObjectDefinitionBlock } from 'nexus/dist/blocks'
import { intArg, arg, nonNull } from 'nexus'
import { Context } from '../../../context'
import { getUserId } from '../../../utils'
import { FollowUserInput } from '../../ObjectTypes'

export const FollowUser = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('FollowUser', {
    type: 'User',
    args: {
      data: nonNull(
        arg({
          type: FollowUserInput,
        }),
      ),
    },
    description: 'Follow Users',
    // @ts-ignore
    resolve: async (_, { data: { id } }, ctx: Context) => {
      try {
        const CurrentUserId = getUserId(ctx)
        const RequestingUser = await ctx.prisma.user.findUnique({
          where: { id },
        })

        if (!RequestingUser) return new Error(`User Not Found`)
        if (id === CurrentUserId) return new Error(`You cannot follow yourself`)
        if (!id) throw new Error(`Who Do You want To Follow ??`)
        if (!CurrentUserId) return new Error(`Please Login`)
        const AlreadyAFollower = await ctx.prisma.user.findMany({
          where: {
            following: {
              some: {
                id,
              },
            },
          },
        })

        if (AlreadyAFollower.length > 0)
          return new Error(`You Are Already Following This User`)

        return ctx.prisma.user.update({
          where: { id: CurrentUserId },
          data: {
            following: {
              connect: {
                id,
              },
            },
          },
        })
      } catch (error) {
        throw new Error(`Something went wrong`)
      }
    },
  })
  t.field('UnFollowUser', {
    type: 'User',
    args: {
      data: nonNull(
        arg({
          type: FollowUserInput,
        }),
      ),
    },
    description: 'UnFollow Users',
    // @ts-ignore
    resolve: async (_, { data: { id } }, ctx: Context) => {
      try {
        const CurrentUserId = getUserId(ctx)
        const RequestingUser = await ctx.prisma.user.findUnique({
          where: { id },
        })

        if (!RequestingUser) return new Error(`User Not Found`)
        if (id === CurrentUserId) return new Error(`You cannot follow yourself`)
        if (!id) throw new Error(`Who Do You want To Follow ??`)
        if (!CurrentUserId) return new Error(`Please Login`)
        return ctx.prisma.user.update({
          where: { id: CurrentUserId },
          data: {
            following: {
              disconnect: {
                id,
              },
            },
          },
        })
      } catch (error) {
        throw new Error(`Something went wrong`)
      }
    },
  })
}
