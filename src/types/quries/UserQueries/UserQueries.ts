import { nonNull, queryType, stringArg } from 'nexus'
import { ObjectDefinitionBlock } from 'nexus/dist/blocks'
import { Context } from '../../../context'
import { getUserId } from '../../../utils'

export const UsersQueries = (t: ObjectDefinitionBlock<'Query'>) => {
  t.field('GetUserProfile', {
    type: 'User',
    args: {
      username: nonNull(
        stringArg({ description: 'Find User with unique username' }),
      ),
    },
    description: 'Get Users Profile',
    resolve: async (_, { username }, ctx: Context) => {
      try {
        return ctx.prisma.user.findUnique({
          where: { username },
          rejectOnNotFound: true,
          select: {
            username: true,
            firstName: true,
            lastName: true,
            email: true,
            id: true,
            createdAt: true,
            password: false,
          },
        })
      } catch (error) {
        return error
      }
    },
  })
  t.field('CurrentUser', {
    type: 'User',
    resolve: async (_, __, ctx: Context) => {
      try {
        const id = getUserId(ctx)
        if (!id) return null
        return ctx.prisma.user.findFirst({ where: { id } })
      } catch (error) {
        return error
      }
    },
  })
}
