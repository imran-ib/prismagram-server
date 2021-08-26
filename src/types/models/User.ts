import { objectType } from 'nexus'
import { Context } from '../../context'
import { getUserId } from '../../utils'

export const User = objectType({
  name: 'User',

  definition(t) {
    t.nonNull.int('id')
    t.string('lastName')
    t.nonNull.string('firstName')
    t.nonNull.string('email')
    t.nonNull.string('username')
    t.nullable.string('bio')
    t.nullable.string('avatar')
    t.nullable.string('lastSeen')
    t.nullable.string('lastTyped')
    t.field('isActive', {
      type: 'Boolean',
      resolve: async (root, _args, ctx: Context) => {
        const add_minutes = function (dt: any, minutes: any) {
          return new Date(dt.getTime() + minutes * 6000)
        }
        // One Minute
        const LastSeen = add_minutes(root.lastSeen, 10).toString()
        const Now = new Date().toString()
        return LastSeen > Now
      },
    })
    // TODO implement pagination on users photo
    t.list.field('Photos', { type: 'Photo' })
    t.list.field('Comment', { type: 'Comment' })
    t.list.field('Hashtags', { type: 'HashTag' })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    //Computed Fields
    t.field('FollowersCount', {
      type: 'Int',
      resolve: (root, _args, ctx: Context, _info) => {
        try {
          return ctx.prisma.user.count({
            where: {
              following: {
                some: { id: root.id },
              },
            },
          })
        } catch (error) {
          return error
        }
      },
    })
    t.field('FollowingCount', {
      type: 'Int',
      resolve: (root, _args, ctx: Context, _info) => {
        try {
          return ctx.prisma.user.count({
            where: {
              followedBy: {
                some: { id: root.id },
              },
            },
          })
        } catch (error) {
          return error
        }
      },
    })
    t.field('ISFollowing', {
      type: 'Boolean',
      resolve: async (root, _args, ctx: Context, _info) => {
        try {
          const MyId = getUserId(ctx)
          if (!MyId) return false
          const User = await ctx.prisma.user.count({
            where: {
              id: MyId,
              following: {
                some: { id: root.id },
              },
            },
          })
          return Boolean(User)
        } catch (error) {
          return error
        }
      },
    })
    t.field('IsMe', {
      type: 'Boolean',
      resolve: async (root, _args, ctx: Context, _info) => {
        try {
          const MyId = getUserId(ctx)
          if (!MyId) return false
          if (MyId === root.id) {
            return true
          } else {
            return false
          }
        } catch (error) {
          return error
        }
      },
    })
    // TODO Remove
    t.field('Now', {
      type: 'String',
      resolve: () => {
        return new Date()
      },
    })
  },
})

// Last Seen 1000 + 500
// Now     >   1200
