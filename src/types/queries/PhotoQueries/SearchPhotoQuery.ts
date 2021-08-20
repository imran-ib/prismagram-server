import { arg, nonNull } from 'nexus'
import { ObjectDefinitionBlock } from 'nexus/dist/blocks'
import { Context } from '../../../context'
import { SearchInput } from '../../ObjectTypes'

export const SearchPhotoQuery = (t: ObjectDefinitionBlock<'Query'>) => {
  t.list.field('SearchPhoto', {
    type: 'Photo',
    args: {
      data: nonNull(
        arg({
          type: SearchInput,
        }),
      ),
    },
    resolve: async (_, { data: { cursor, term } }, ctx: Context) => {
      try {
        if (!term) return new Error(`You Must Provide a Search Term`)
        if (term.trim() === '')
          return new Error(`You Must Provide a Search Term`)
        const Result = await ctx.prisma.photo.findMany({
          where: {
            caption: {
              contains: term,
            },
          },
          take: 5,
          skip: cursor ? 1 : 0,
          cursor: cursor ? { id: cursor } : undefined,
        })
        return Result
      } catch (error) {
        return error
      }
    },
  })
}
