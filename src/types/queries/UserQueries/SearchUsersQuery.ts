import { arg, nonNull } from 'nexus'
import { ObjectDefinitionBlock } from 'nexus/dist/blocks'
import { Context } from '../../../context'
import { SearchUsersInput } from '../../ObjectTypes'

export const SearchUserQuery = (t: ObjectDefinitionBlock<'Query'>) => {
  t.list.field('SearchUser', {
    type: 'User',
    args: {
      data: nonNull(
        arg({
          type: SearchUsersInput,
        }),
      ),
    },
    resolve: async (_, { data: { term, cursor } }, ctx: Context) => {
      try {
        if (!term) return new Error(`You Must Provide a Search Term`)
        if (term.trim() === '')
          return new Error(`You Must Provide a Search Term`)
        const Result = await ctx.prisma.user.findMany({
          where: {
            username: {
              startsWith: term.toLowerCase(),
              mode: 'insensitive',
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
