import { queryType } from 'nexus'
import { UsersQueries } from './UserQueries/UserQueries'
import { FollowUserQueries } from './UserQueries/FollowUserQueries'
import { SearchUserQuery } from './UserQueries/SearchUsersQuery'
import { GetPhotoQuery } from './PhotoQueries/GetPhoto'
import { GetHashtagsQuery } from './HashTagsQueries/GetHashtagsQuery'

export const Query = queryType({
  definition(t) {
    t.crud.users() // TODO Remove me
    UsersQueries(t)
    FollowUserQueries(t)
    SearchUserQuery(t)
    GetPhotoQuery(t)
    GetHashtagsQuery(t)
  },
})
