import { nonNull, queryType, stringArg } from 'nexus'
import { Context } from '../../../context'
import { UsersQueries } from './UserQueries'
import { FollowUserQueries } from './FollowUserQueries'
import { SearchUserQuery } from './SearchUsersQuery'

export const Query = queryType({
  definition(t) {
    t.crud.users() // TODO Remove me
    UsersQueries(t)
    FollowUserQueries(t)
    SearchUserQuery(t)
  },
})
