import { rule, shield } from 'graphql-shield'
import { getUserId } from '../utils'
import { Context } from '../context'

const rules = {
  isAuthenticatedUser: rule()(async (_parent, _args, context: Context) => {
    const userId = getUserId(context)
    const user = await context.prisma.user.findFirst({
      where: { id: userId },
    })
    if (!user) return new Error(`User not Found`)
    return Boolean(userId)
  }),
  isPostOwner: rule()(async (_parent, args, context) => {
    const userId = getUserId(context)
    const author = await context.prisma.post
      .findUnique({
        where: {
          id: Number(args.id),
        },
      })
      .author()
    return userId === author.id
  }),
}

export const permissions = shield({
  Query: {
    // me: rules.isAuthenticatedUser,
    // draftsByUser: rules.isAuthenticatedUser,
    // postById: rules.isAuthenticatedUser,
  },
  Mutation: {
    UpdateUsersProfiles: rules.isAuthenticatedUser,
    FollowUser: rules.isAuthenticatedUser,
  },
})
