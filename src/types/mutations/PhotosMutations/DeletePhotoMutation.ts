import { intArg, nonNull } from 'nexus'
import { ObjectDefinitionBlock } from 'nexus/dist/blocks'
import { Context } from '../../../context'
import { getUserId } from '../../../utils'

export const DeletePhotoMutation = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('DeletePhoto', {
    type: 'Boolean',
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_, { id }, ctx: Context) => {
      try {
        const userId = getUserId(ctx)
        const photo = await ctx.prisma.photo.findFirst({
          where: {
            id,
            userId,
          },
        })
        if (!photo) return new Error(`Not Authorized`)
        await ctx.prisma.photo.delete({
          where: { id },
        })
      } catch (error) {
        return error
      }
    },
  })
}
