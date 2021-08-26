import { arg, intArg, nonNull } from 'nexus'
import { ObjectDefinitionBlock } from 'nexus/dist/blocks'
import { Context } from '../../../context'
import { getUserId } from '../../../utils'
import { NEW_MESSAGE } from '../../Constants'
import { SendMessageInput } from '../../ObjectTypes'

export const MessagesMutations = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('CreateMessage', {
    type: 'Message',
    args: {
      data: nonNull(
        arg({
          type: SendMessageInput,
        }),
      ),
    },
    resolve: async (
      _,
      { data: { payload, roomId, senderId } },
      ctx: Context,
    ) => {
      try {
        const LoggedInUser = getUserId(ctx)
        let Room = null
        if (senderId) {
          const sender = await ctx.prisma.user.findMany({
            where: { id: senderId },
            select: { id: true },
          })
          if (!sender) return new Error(`User Not Found`)
          // TODO Get The Room if Room Exists b/w two users instead of creating new room
          const AlreadyExits = await ctx.prisma.room.findFirst({
            where: {
              user: {
                every: {
                  id: {
                    in: [LoggedInUser!, senderId],
                  },
                },
              },
            },
          })
          if (AlreadyExits) {
            Room = AlreadyExits
          } else {
            Room = await ctx.prisma.room.create({
              data: {
                user: {
                  connect: [{ id: senderId }, { id: LoggedInUser }],
                },
              },
            })
          }
        } else if (roomId) {
          Room = await ctx.prisma.room.findUnique({
            where: { id: roomId },
            select: { id: true },
          })
          if (!Room) return new Error(`Room Not Found`)
        }
        if (!Room) return new Error(`Room Not Found`)
        const Message = await ctx.prisma.message.create({
          data: {
            payload,
            room: {
              connect: {
                id: Room.id,
              },
            },
            user: {
              connect: {
                id: LoggedInUser,
              },
            },
          },
        })
        ctx.pubsub.publish(NEW_MESSAGE, Message)
        return Message
      } catch (error) {
        return error
      }
    },
  })
  t.field('MarkMessageRead', {
    type: 'Message',
    args: {
      messageId: nonNull(intArg()),
    },
    resolve: async (_, { messageId }, ctx: Context) => {
      try {
        const userId = getUserId(ctx)
        const Message = await ctx.prisma.message.findFirst({
          where: {
            id: messageId,
            userId: {
              not: userId,
            },
            room: {
              user: {
                some: {
                  id: userId,
                },
              },
            },
          },
          select: {
            id: true,
          },
        })
        if (!Message) return new Error(`Message not found`)
        await ctx.prisma.message.update({
          where: {
            id: Message.id,
          },
          data: {
            read: true,
          },
        })
        return Message
      } catch (error) {
        return error
      }
    },
  })
}
