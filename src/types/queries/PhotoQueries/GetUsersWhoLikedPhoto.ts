import { intArg, nonNull } from 'nexus'
import { ObjectDefinitionBlock } from 'nexus/dist/blocks'
import { Context } from '../../../context'

export const GetUsersWhoLikedPhoto = (t: ObjectDefinitionBlock<'Query'>) => {
  t.list.field('GetUsersWhoLikedPhoto', {
    type: 'User',
    args: {
      photoId: nonNull(intArg()),
    },
    description: 'Get All The Users Who liked Current Photo',
    resolve: async (_, { photoId }, ctx: Context) => {
      try {
        const users = await ctx.prisma.like.findMany({
          where: {
            photoId,
          },
          select: {
            user: true,
          },
        })
        //
        // NOTE Very important above 'users' is returning an array which is an array of objects and inside we have users
        // this resolver is expecting an array of users. so we map over users and return new array with users
        return users.map((user) => user.user)
      } catch (error) {
        return error
      }
    },
  })
}
