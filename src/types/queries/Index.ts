import { queryType } from 'nexus'
import { UsersQueries } from './UserQueries/UserQueries'
import { FollowUserQueries } from './UserQueries/FollowUserQueries'
import { SearchUserQuery } from './UserQueries/SearchUsersQuery'

export const Query = queryType({
  definition(t) {
    t.crud.users() // TODO Remove me
    UsersQueries(t)
    FollowUserQueries(t)
    SearchUserQuery(t)
  },
})
