import { nonNull, queryType, stringArg } from 'nexus'
import { Context } from '../../context'

export const Query = queryType({
  definition(t) {
    t.crud.users() // TODO Remove me

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
  },
})
