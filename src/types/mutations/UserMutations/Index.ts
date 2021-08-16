import { mutationType } from 'nexus'
import { UpdateUsersProfiles } from './EditUsersProfileMutation'
import { UserAuthMutations } from './UserAuthMutations'
import { FollowUser } from './FollowUsers'

export const Mutation = mutationType({
  definition(t) {
    UpdateUsersProfiles(t)
    UserAuthMutations(t)
    FollowUser(t)
  },
})
