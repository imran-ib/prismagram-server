import { queryType } from 'nexus'
import { UsersQueries } from './UserQueries/UserQueries'
import { FollowUserQueries } from './UserQueries/FollowUserQueries'
import { SearchUserQuery } from './UserQueries/SearchUsersQuery'
import { GetPhotoQuery } from './PhotoQueries/GetPhoto'
import { SearchPhotoQuery } from './PhotoQueries/SearchPhotoQuery'
import { GetHashtagsQuery } from './HashTagsQueries/GetHashtagsQuery'
import { GetUsersWhoLikedPhoto } from './PhotoQueries/GetUsersWhoLikedPhoto'
import { FeedsQuery } from './FeedsQuery/FeedsQuery'
import { GetPhotoComments } from './PhotoQueries/GetPhotoComments'
import { MessagesQueries } from './MessagesQueries/MessagesQueries'

export const Query = queryType({
  definition(t) {
    t.crud.users() // TODO Remove me
    UsersQueries(t)
    FollowUserQueries(t)
    SearchUserQuery(t)
    GetPhotoQuery(t)
    GetHashtagsQuery(t)
    SearchPhotoQuery(t)
    GetUsersWhoLikedPhoto(t)
    FeedsQuery(t)
    GetPhotoComments(t)
    MessagesQueries(t)
  },
})
