import { and, rule, shield } from 'graphql-shield'
import { getUserId } from '../utils'
import { Context } from '../context'

const rules = {
  isAuthenticatedUser: rule()(async (_parent, _args, context: Context) => {
    const userId = getUserId(context)
    const user = await context.prisma.user.findFirst({
      where: { id: userId },
      select: { id: true },
    })
    if (!user) return new Error(`User not Found`)
    return Boolean(userId)
  }),
  isPhotoOwner: rule()(async (_parent, args, context: Context) => {
    //args are coming from mutation (whichever mutations are using this rule)
    const userId = getUserId(context)
    const owner = await context.prisma.photo
      .findUnique({
        where: {
          id: Number(args.id),
        },
      })
      .user()

    return userId === owner?.id
  }),
}

export const permissions = shield({
  Query: {
    Feeds: rules.isAuthenticatedUser,
    GetRooms: rules.isAuthenticatedUser,
    GetRoom: rules.isAuthenticatedUser,
    // me: rules.isAuthenticatedUser,
    // draftsByUser: rules.isAuthenticatedUser,
    // postById: rules.isAuthenticatedUser,
  },
  Mutation: {
    UpdateUsersProfiles: rules.isAuthenticatedUser,
    FollowUser: rules.isAuthenticatedUser,
    UnFollowUser: rules.isAuthenticatedUser,
    UploadPhoto: rules.isAuthenticatedUser,
    TogglePhotoLike: rules.isAuthenticatedUser,
    CreateComment: rules.isAuthenticatedUser,
    UpdateComment: rules.isAuthenticatedUser,
    DeleteComment: rules.isAuthenticatedUser,
    DeletePhoto: rules.isAuthenticatedUser,
    CreateMessage: rules.isAuthenticatedUser,
    MarkMessageRead: rules.isAuthenticatedUser,
    UpdatePhoto: and(rules.isAuthenticatedUser, rules.isPhotoOwner),
  },
})
