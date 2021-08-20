import { intArg, nonNull, nullable, stringArg } from 'nexus'
import { ObjectDefinitionBlock } from 'nexus/dist/blocks'
import { Context } from '../../../context'

export const GetHashtagsQuery = (t: ObjectDefinitionBlock<'Query'>) => {
  t.field('GetHashtag', {
    type: 'HashTag',
    args: {
      hashtag: nonNull(stringArg()),
      page: nullable(intArg()),
    },
    resolve: async (root, args, ctx: Context, info) => {
      try {
        const Tag = await ctx.prisma.hashtag.findUnique({
          where: { hashtag: args.hashtag },
          // See Hashtag modal for explanation 🙂
          // include: {
          //   Photos: {
          //     take: info.variableValues.photosTake,
          //     skip: info.variableValues.photosCursor ? 1 : 0,
          //     cursor: info.variableValues.photosCursor
          //       ? { id: info.variableValues.photosCursor }
          //       : undefined,
          //   },
          // },
        })

        return Tag
      } catch (error) {
        return error
      }
    },
  })
}

// QUERY
// query Query($getHashtagHashtag: String!, $photosCursor: Int, $photosTake: Int) {
//   GetHashtag(hashtag: $getHashtagHashtag) {
//     hashtag
//     PhotoCount
//     Photos(cursor: $photosCursor,take: $photosTake) {
//       caption
//       id
//     }
//   }
// }

// Variables
// {
//   "getHashtagHashtag": "#OMG",
//   "photosCursor": 2,
//   "photosTake": 1
// }
